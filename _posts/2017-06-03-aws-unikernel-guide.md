---
title: "Hosting Static Websites as Unikernels on Amazon Web Services: A Guide"
tags: mirage ocaml unikernel
---

Since being accepted as an intern with the [Mirage OS](http://mirage.io/)
project, I've been doing a lot of tinkering
with [unikernels](http://unikernel.org/). In particular, I've become convinced
that hosting a static site as a unikernel has a lot of benefits over traditional
methods. A unikernel is
a [secure](https://somerandomidiot.com/blog/2014/08/11/attack-surface-area/) way
to self-host your site, which means you
have [control](https://somerandomidiot.com/blog/2014/08/14/my-content-is-mine/)
over your own content. But because unikernels are a relatively new technology
and are still largely experimental, building your own with zero prior knowledge
is hard. I'm hoping to lower that barrier to entry with this guide.
<!--more-->
Here's what we'll be doing:

- building a custom unikernel to serve our static site using the Mirage OS
  libraries and build tool
- fetching a TLS certificate for our domain using [Let's Encrypt](https://letsencrypt.org/)
- deploying our shiny new unikernel and certificate to [Amazon Web Services](https://aws.amazon.com/)

In case I made it sound like a cakewalk just now, a word of caution: the
unikernel ecosystem is still pretty immature, and there's a pretty high chance
that what worked for me is going to require some small tweaks on your part. If
you're afraid of getting your hands dirty, you might want to wait until the
tooling matures a bit before attempting this. This guide will work best for you
if you:

- use some type of *nix. AFAIK this guide should be
  easily followable for all linux and BSD users. I am less sure about OSX users.
  Windows users: Godspeed.
- want to host a static website. If you are looking to host some other,
  non-static type of site, or are interested in unikernels for some other reason
  entirely, you will probably still be able to make use of the later parts of
  this guide (where we deploy the unikernel to AWS). However, the unikernel code
  will look significantly different, and for that part you're on your own.
- already have a custom domain for your site. I will not cover how to purchase
  and configure a domain name.
  
One more thing: most software guides install all needed dependencies in the
first step, but since some of the tools we'll be using are kind of fragile,
we're going to install them one at a time, verifying that they work as expected
at each step. That way, if you need to do some tinkering to get things right at
any point, you can continue to follow the guide afterwards. But for the
brave/impatient, here's our dependency list:

- Mirage OS, which requires OCaml
- [certbot](https://certbot.eff.org/) (if you don't have a TLS cert for your domain but want one)
- An AWS account (free tier will suffice)
- The AWS CLI
- [ec2-unikernel](https://github.com/GaloisInc/ec2-unikernel), which requires Haskell

Let's dive in!

### 1. Install Mirage OS
First, we're going to build a unikernel that we can run and test locally. We
will be using the Mirage OS libraries and build tool to build our unikernels.
With Mirage, unikernels are written in OCaml, but as long as you're okay using
my unikernel code, you don't have to know any OCaml to follow this guide. If
you are completely new to unikernels, know that there are [other systems](http://unikernel.org/projects/) that you
can use to do this. However, I have no idea if unikernels build using other
systems will run on AWS, so I suggest you stick to Mirage for now. Follow the
[install instructions](https://mirage.io/wiki/install) to install OCaml, OPAM,
and Mirage, then run these commands to test your installation:

    $ git clone https://github.com/mirage/mirage-skeleton
    $ cd mirage-skeleton/tutorial/hello
    $ mirage configure -t unix
    $ make depend
    $ make
    $ ./hello
    2017-06-02 19:47:56 -04:00: INF [application] hello
    2017-06-02 19:47:57 -04:00: INF [application] hello
    2017-06-02 19:47:58 -04:00: INF [application] hello
    2017-06-02 19:47:59 -04:00: INF [application] hello
    
If you get output similar to above, then your installation works! If not, you
can always pop into the #mirage channel on IRC for help troubleshooting your installation.

### 2. Compile a unikernel for your static site
Now that we have Mirage installed, we can build a unikernel for our static site!
Our unikernel is composed of two OCaml source files, `config.ml` and
`dispatch.ml`, which can be found [here](). These files are nearly identical to
the ones in `mirage-skeleton/applications/static_website_tls/`, except I've
tweaked them a bit to handle URLs with a trailing slash.
Let's say the static site you want to serve
is located at `~/mysite/content`. Save the OCaml files as `~/mysite/config.ml`
and `~/mysite/dispatch.ml`, respectively, then edit line 5 of `config.ml` to
point to `~/mysite/content`. You also need to copy the directory
`mirage-skeleton/applications/static_website_tls/tls` to `~/mysite/tls`. Because
our unikernel is configured to automatically redirect HTTP requests to HTTPS, it
needs some type of TLS certificate to build and run correctly. For now we're
going to use the self-signed ones included with the mirage static site example,
but in the next step we'll grab a real TLS certificate for our domain using
Let's Encrypt. If you just want a HTTP-only server, you are free to modify the
code yourself, but you should really be using TLS! With the certificate copied,
now run:

    $ cd ~/mysite
    $ mirage configure -t unix --net=socket --http=8080 --https=4433
    $ make depend && make
    $ ./https
    2017-06-02 20:04:47 -04:00: INF [tcpip-stack-socket] Manager: connect
    2017-06-02 20:04:47 -04:00: INF [tcpip-stack-socket] Manager: configuring
    2017-06-02 20:04:47 -04:00: INF [https] listening on 4433/TCP
    2017-06-02 20:04:47 -04:00: INF [http] listening on 8080/TCP
    
These commands should generate a lot of output, the last of which is displayed
above. You should now be able to open `http://localhost:8080` in your browser,
which will redirect you to `https://localhost:4433` and then block you from
viewing that because the TLS certificate we supplied isn't trustworthy. Because
we're trying to verify locally that our site works as expected, this time I
recommend overriding the block so you can view your site (in Firefox click
"Advanced > Add Exception"). Once you've verified that your site works as
expected, you're (almost) ready to upload your site to AWS.

### 3. Fetch a TLS certificate for your domain using Let's Encrypt
Because we're using a self-signed TLS certificate right now, all browsers will
prevent their users from visiting our site as a security precaution. In order to
actually serve our website over HTTPS, we need a real, trustworthy certificate.
This used to mean paying a certificate authority money, but since last year the
Let's Encrypt project has been giving them away for free. If you were already
self-hosting your site over HTTPS and thus already have a TLS certificate for
your domain, just copy it to `~/mysite/tls` and you can skip this step.
Otherwise, go ahead and follow the instructions for your distro on
the [certbot](https://certbot.eff.org/) website to download certbot. Select
"None of the above" for the "Software" option. Once you have certbot installed,
there are a couple of ways you can go about actually getting your certificate.
If you are migrating to a unikernel from a self-hosted server, your simplest
option is probably to install certbot on the server and use `certbot certonly
--manual --preferred-challenges http`, which will establish your ownership over
your domain by having your enter commands on the server. If, however, you are migrating from
something like wordpress or github pages (my case) where you don't have control
of the server, you'll have to run `certbot certonly --manual
--preferred-challenges dns`, which establishes your ownership over your domain
by having you set certain DNS records. Note that both methods will record the IP
of the machine you requested the certificate from, which in the `dns` case might
be different from the IP you plan to host the unikernel from. If you do not want
the IP of your development machine recorded and associated with the certificate,
one thing you could do (probably, I haven't tested it) is boot up a linux
instance on AWS, associate it with the amazon elastic IP you plan to use for
your unikernel, point your DNS records at the elastic IP, install a conventional
webserver and certbot on the instance, copy over your static site files and
serve the site, and then use `certbot certonly --manual --preferred-challenges
http` to get your cert. Your choice! In any case, make sure you set
`--config-dir`, `--work-dir`, and `--logs-dir` to writeable paths so that you
don't have to run the script as root, and `-d example.com` to specify the
domains you want certificates for. See the
[certbot manual](https://certbot.eff.org/docs/using.html#getting-certificates-and-choosing-plugins)
if you are unsure or would like more information. So, to summarize, in my case I
ran:

    $ certbot certonly -d davidudelson.com -d www.davidudelson.com --manual --preferred-challenges dns --config-dir ~/letsencrypt --work-dir ~/letsencrypt --logs-dir ~/letsencrypt
    
to generate my certificate. Once you have yours, copy over the appropriate
files:

    $ cp ~/letsencrypt/live/example.com/privkey.pem ~/mysite/tls/server.key
    $ cp ~/letsencrypt/live/example.com/cert.pem ~/mysite/tls/server.pem
    $ cp ~/letsencrypt/live/example.com/chain.pem ~/mysite/tls/ca-roots.crt
    
Now you have a real TLS certificate to use with your unikernel!

### 4. Install ec2-unikernel
Next we are going to install
the [ec2-unikernel][https://github.com/GaloisInc/ec2-unikernel] tool,
which automates the process
of uploading and installing unikernels to EC2 as Amazon Machine Images (AMIs).
You need to have [Haskell](https://www.haskell.org/downloads#stack) and
[Stack](https://docs.haskellstack.org/en/stable/install_and_upgrade/) installed
in order to build and run the tool, so install those first if you don't have them
already. Next, run:

    $ git clone https://github.com/GaloisInc/ec2-unikernel
    $ cd ec2-unikernel
    $ stack init

Now normally we would run `stack build --install-ghc` to build the tool, but unfortunately at
the time of writing, this package is a little bit broken, and it doesn't compile
with the default settings. If you're reading this at least a few weeks after the
time of writing, try a `stack build --install-ghc` and see if it works, but if not, I'll
demonstrate what I had to do to get it working. In essence I needed to use an
earlier version of the `amazonka-*` set of packages, which required me to
both choose a resolver for stack that had the
versions of the packages I wanted and rollback the tool to an earlier version:

    $ git checkout 4d28b4c
    $ stack config set resolver "lts-7.22"
    $ stack build --install-ghc
    
Once the tool builds correctly, the command `stack exec ec2-unikernel` should
print out some error message. It fails because we haven't set up AWS yet, which
is what we're gonna do next!

### 5. Setup AWS

There's a couple things we need to do on AWS to allow ec2-unikernel to upload
our unikernels correctly:

- Generate an AWS credential keypair
- Install and configure the AWS CLI
- Make an S3 bucket for our unikernels
- Create the "vmimport" role
- Create a security group for our unikernels

We'll need to generate the keypair using the AWS web interface, but once we've
done that, the rest can be done from the command line thanks to the AWS
CLI. Of course, all of this assumes that you have an AWS account, so create one
first if you don't already have one. AWS has a free tier that gives access to S3
and the least powerful instances on EC2 for one year. That is, you get a free
year of unikernels!

##### Generate an AWS credential keypair
After your account is set up, log in to the control panel
and click on your name in the top-righthand corner followed by "My Security
Credentials". Amazon will prompt you to create an IAM user; I didn't bother.
Click on "Access Keys" > "Create New Access Key" and you'll be shown a dialogue
box with your access and private keys. **Do not close this dialogue box yet**.
There's no way to see your secret key again once you do. We'll be giving this
keypair to the CLI in just a minute, but if you don't want to wait you can copy
it into a text file or something just to be safe.

##### Install and configure the AWS CLI
[Install](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)the
CLI, then run `aws configure`. Enter your AWS access and private keys from the
previous step, then pick a default [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions). AWS separates its servers into
regions, and all the configuration we're doing is only valid for one region. So
once you pick a region, stick to it.

##### Make an S3 bucket for our unikernels
AWS S3 is just storage. S3 storage is allocated by "bucket". The ec2-unikernel
tool we installed before will upload our unikernel to an S3 bucket and then
import it from the bucket into EC2. To make an S3 bucket, run:

    $ aws s3 mb s3://<bucket-name>
    
When choosing a bucket name, keep in mind that the bucket namespace is shared by
your entire region. Make sure to pick a memorable name that's unique to you. For
example, I named my bucket "dudelson-unikernels".

##### Create the "vmimport" role
This is something that ec2-unikernel needs to be able to import our unikernels
from S3 into EC2. Follow the instructions [here](https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-image-import.html#vmimport-service-role) to set it up. The json files
described in the article are located in the `ec2-unikernel/policies` directory.

##### Create a security group for our unikernels
EC2 instances are controlled by "security groups" which describe what ports
are open for inbound and outbound network traffic on the instance. The default
security group that is created when you launch an instance opens only port 22
so that the instance can be accessed via SSH. In our case, we cannot access our
static site unikernel via SSH and only want it to serve web traffic, so we're
going to create a security group that opens only ports 80 and 443. Use the
following command:

    $ aws ec2 create-security-group --group-name "<name>" --description "<description>"
    $ aws ec2 authorize-security-group-ingress --group-name "<name>" --protocol tcp --port 80 --cidr 0.0.0.0/0
    $ aws ec2 authorize-security-group-ingress --group-name "<name>" --protocol tcp --port 443 --cidr 0.0.0.0/0
    
The group `<name>` and `<description>` can both be something as simple as
"unikernels", since you're not sharing the security group namespace with your
entire region.

### 6. Build and deploy your unikernel

And now, the main attraction! We've put all the pieces in place, and now we can
finally deploy our unikernel to AWS. But before we do so, we need to rebuild the
unikernel for AWS's hypervisor, Xen. This looks very similar to what we did in
step 1:
    
    $ cd ~/mysite
    $ mirage configure -t xen --dhcp=true
    $ make depend && make
    
When we build for the xen hypervisor, we need to enable DHCP so that our
unikernel can find the default gateway provided by AWS when it's launched on
EC2. Now we can upload it:

    $ cd ~/ec2-unikernel
    $ stack exec ec2-unikernel -- -o <aws-access-key> -w <aws-private_key> -b <bucket-name> ~/mysite/https.xen
    
We provide ec2-unikernel with our AWS keypair and the name of the S3 bucket we
created, which is all it needs to upload and import our unikernel as an AMI.
This takes a while, so now would be a good time to get a drink or something.
When that's done, the last line of output will be the ID of the new AMI. We use
that to fire up the instance from the command line:

    $ aws ec2 run-instances --image-id <image-id> --count 1 --instance-type t1.micro --security-groups "<security-group-name>"
    
The `<image-id>` should look like "ami-ABCD1234". This should spit out a bunch
of json about the instance. Wait about 60 seconds, then run `aws ec2 describe-instances | grep "running"`.
If your unikernel is up,
you should get a line of output back. If not, wait a little longer and try
again. Once you've confirmed that your instance is up and running, use `aws ec2
describe-instances | grep "PublicDnsName"` to find the URL that you can use to
connect to your website. Pop that in your browser and you should get a security
warning like we did in step 2. This is again because the TLS cert we generated
is for our domain name, not blahblah.compute.amazonaws.com. Put this nonetheless
means that you were able to successfully connect to your unikernel running on
AWS!

### 7. Assign an elastic IP and configure DNS

AWS elastic IPs allow you to allocate a public IPv4 address that you can assign
to a running EC2 instance. As in the previous step when we didn't have an EIP
yet, the instance is given a public IP anyway, but it's chosen from the pool of
available IPs for your region, and once the instance is terminated, its IP is
released back into the pool, meaning that the next instance you start will have
a different IP. But an EIP, once allocated, belongs to you, even
if you terminate one instance and start another. This means you can point the
DNS records for your domain at the EIP, and whenever you build and deploy a new
unikernel, you can reassign the EIP to point to it, keeping your domain up in a
hassle-free way. One warning though: If you allocate an EIP and leave it idle
(e.g. not assigned to a running instance), you're charged hourly for it. So make
sure to deploy your new unikernel and reassign the EIP before terminating the
old one. With all that in mind, let's allocate an EIP and assign it to our
instance:

    $ aws ec2 allocate-address --domain vpc
    $ aws ec2 associate-address --instance-id <instance> --allocation-id <allocation>
    
`<instance>` is the ID of the running instance, and can be found using `aws ec2
describe-instances | grep ""`. `<allocation>` is the allocation ID output by the
`allocation-address` command. After assigning an EIP, update the type A DNS
records for your domain to point to the EIP, and your site is live!

### 8. Maintenance

As I eluded to at the beginning of the guide, one of the really nice properties
of unikernels is every time you make a change to your site, you rebuild the
entire software stack and upload a fresh image. This means that even if an
attacker compromises your system through your website, the damage will be undone
with the next image. Here are the steps you'll perform to update your site by
deploying a new unikernel:

- rebuild your static site. I'm using [jekyll](https://jekyllrb.com/) for this, so for me that's `bundle
  exec jekyll build`.
- rebuild your unikernel

    $ cd ~/mysite
    $ mirage configure -t unix --net=socket --http=8080 --https=4433 # test build; OR
    $ mirage configure -t xen --dhcp=true                            # production build
    $ make depend && make
    
- upload your unikernel to EC2

    $ cd ~/ec2-unikernel
    $ stack exec ec2-unikernel -- -o <aws-access-key> -w <aws-private-key> -b <bucket-name>
    
- launch the unikernel, reallocate the EIP, and terminate the old unikernel 

    $ aws ec2 describe-instances | grep "InstanceId" # get the old image ID
    $ aws ec2 run-instances --image-id <image-id> --count 1 --instance-type t1.micro --security-groups "<security-group-name>" | grep "InstanceId" # get the new image ID
    $ aws ec2 associate-address --instance-id <new-instance> --allocation-id <allocation>
    $ aws ec2 terminate-instances --instance-ids <old-instance>
    
Of course I've [scripted]() this entire process from stem to stern.

And that's it! Go enjoy your new-and-improved unikernel life, tell your friends,
and maybe write me a build tool that will make this easier.
