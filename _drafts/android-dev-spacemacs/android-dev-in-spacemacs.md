# Android Development in Spacemacs

I'm going to assume you're using some kind of *NIX. The only system I've
verified this to work for is Arch Linux, because that's what I use, but I think
it should be more or less the same on all linux distributions. If you're using
windows, it's likely you've had to read a fair share of linux-oriented
articles in order to set up emacs in the first place, so I have faith that you
will be able to adapt this to your needs.

Note that all of the android dev tools are available for arch as packages:
https://wiki.archlinux.org/index.php/android

On arch, you need the following 32-bit packages: gcc-multilib lib32-zlib lib32-ncurses lib32-readline

1. Make sure you have JDK7 installed. Additionally, you will need some type of
java build system. I would recommend using gradle, but this article will also give instructions for
ant/maven, in case you're using one of those. However keep in mind that I have
only verified the gradle setup to work, since that's what I'm using. If you do
want to use gradle, you don't have to install it at this point, as android will
install it for us later. So in my case:

    $ pacman -S jdk7-openjdk
    
2. Next we need the android SDK. Put it somewhere out of the way. I put mine in
   `~/.local/share`.
   
    $ wget http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
    $ tar xzf android-sdk_r24.4.1-linux.tgz -C ~/.local/share
    
Be sure to replace the version number in the android sdk filename with the
latest version, which you can find
[here](https://developer.android.com/studio/index.html), if you scroll all
the way to the bottom of the page (under the heading "Get just the command
line tools"). You can also find downloads for the mac and windows versions of
the standalone SDK there.

3. Add the path to the android SDK tools to your system path by editing your
   bashrc, zshrc, or what have you.
   
    $ export PATH=$PATH:~/.local/share/android-sdk-linux/tools
    
Don't forget to source your config file afterwards to load the changes into your shell.

4. Open the SDK manager from the command line:

    $ android sdk
    
Install the latest API, as well as the SDK platform and build tools, if you
don't have them already. Note that you may have to click "install" twice,
because the SDK manager will ask you to "restart android studio" after the SDK
updates. 

[picture here]

Once everything is installed, add the SDK platform tools to your system path:

    $ export PATH=$PATH:~/.local/share/android-sdk-linux/platform-tools

5. Open the AVD manager:

    $ android avd
    
Create a new virtual device. Getting the virtual device to run took a
little bit of doing for me, and I've included an appendix detailing the problems
I had and the workarounds I used. It may be worth a look if you're having
trouble getting your AVD to start after you create it.
Some general tips:
    - Your choice of CPU/ABI matters. Apparently the Intel Atoms are 10x faster
      than the ARM CPU, and they're also the only ones that worked for me, so
      those are what I recommend using, unless you have specific requirements in
      mind for your AVD.
    - *Do not touch the VM Heap size* unless you know what you're doing. If you
      change it, your AVD might never get past a black screen.
    - If you start your AVD and get graphics-looking errors, try toggling the
      "Use Host GPU" setting.
      
[picture here]

5. Make sure you have the java layer for spacemacs. At the time of writing,
there is no android layer, so we're going to install android-mode, which 
provides handy functions for developing your android appliction from within
emacs. Add the following to your init.el:

    ```
    (defun dotspacemacs/layers ()
     ...
     dotspacemacs-configuration-layers
     '(
       ...
       java
       ...
      )

     dotspacemacs-additional-packages
     '(
       ...
       android-mode
       ...
      )
      ...
     )
     
   (defun dotspacemacs/user-config ()
    ...
    (setq 
    ;; point android-mode to the linux sdk we installed in step 2
    android-mode-sdk-dir "~/path/to/android-sdk-linux"
    ;; configure android-mode to use the java build tool we installed in step 1
    ;; you can also set values of 'ant and 'maven
    android-mode-builder 'gradle
    ;; this setting is the same, no matter which build tool you're using
    android-mode-root-file-plist '(ant "AndroidManifest.xml"
                                   maven "AndroidManifest.xml"
                                   gradle "gradlew"))
    ...
    )
    ```

Now hit `SPC f e R` and spacemacs will install the necessary packages and load
the new configuration.

6. Now we can create a project! There are two ways to do this: from the command
   line, and from within emacs. Unfortunately, the emacs way is broken at time
   of writing due to some issues with android-mode, so I'm going to show you the
   command line way. To create a source-controlled project named "MyApp" in
   `~/myapp`, do:
   
    $ android create project --activity MyApp --package com.dudelson.myapp --target 1 --path myapp
    $ cd myapp
    $ git init
    
These command line options are straightforward. "Activity" is the class name
of the default activity of the app, "package" is the java package that
contains the app, and "path" is the relative path to the project. This path
will be created if it doesn't exist. "Target", as far as I know, can simply
be set to 1. If you are using gradle, you have to add a couple options to
the first command above:
    
    $ android create project --activity MyApp --package com.dudelson.myapp --target 1 --path myapp --gradle --gradle-version 2.1.2
    
The argument to the gradle-version option is the latest version of the android
plugin for gradle, which can be found
[here](https://developer.android.com/studio/releases/gradle-plugin.html) (scroll
down to the "Revisions" heading). Now there are a couple more things that must
be done in order to get gradle to build. From the page just linked, you can see
what version of gradle is required by the latest version of the android plugin.
Unfortunately, android might have specified this incorrectly when it setup the
project for us, so we have to edit `gradle/wrapper/gradle-wrapper.properties` in the project root and make
sure that the version is correct on this line:

    distributionUrl=http\://services.gradle.org/distributions/gradle-2.10-all.zip

Additionally, edit `build.gradle`, and look for this line:

    runProguard false
    
The `runProguard` function is deprecated in gradle, so we have to change it to
this:

    minifyEnabled false
    
Now from the project root, run:

    $ ./gradlew assembleDebug
    
You should see the correct versions of gradle and the android plugin downloaded,
and then the various stages of the gradle build. Project setup is complete!
    
7. Now that the project is set up, it's dev time! This is the part of the show
   when you get to develop android apps without sacrificing any aspect of your
   kickass spacemacs environment. A few notes on android development in
   spacemacs:
    - As noted previously, right now android-mode is lacking in some features.
      Specifically, gradle support is less than stellar. So I compile and
      install my projects like this:
      
    $ ./gradlew assembleDebug
    $ adb install build/outputs/apk/myapp-debug.apk
    
      Bind these commands to a key of your choice, and you'll be good to go.


# Additional steps to install React Native
5 or 6 hours into my quest to configure spacemacs for android development, one
of my friends came over and asked me why I wasn't using React Native. "What's
React Native?" I said. 5 minutes later, having had my mind blown, I was
installing node js and watchman. If you haven't checked out React or React
Native yet, I encourage you do to so. I can't go over the installation process
any better than facebook has, so checkout the
[react native docs](http://facebook.github.io/react-native/docs/getting-started.html#content)
to get started.


# Appendix: Installing an AVD
Here are some errors I encountered while getting my AVD set up, and the
workarounds I used:

1. You need the command `glxinfo` available on your system. Arch users will need
   to install the `mesa-demos` package. I do not know what package provides this
   command on other systems, but a quick google should suffice to figure it out.
2. You also need pulseaudio installed and running before you can launch your
   AVD. On my system:
   
    $ pacman -S pulseaudio
    $ pulseaudio --start
    
3. If your emulator is throwing errors like this:

    libGL error: unable to load driver: r600_dri.so
    
Use this:

    $ export ANDROID_EMULATOR_USE_SYSTEM_LIBS=1
    
I put this in my zshrc so I never need to think about it again.

4. You will need to experiment with the "Use Host GPU" setting. I set this
   environment up on two systems, both arch linux, but with different hardware.
   One environment won't run AVDs unless "Use Host GPU" is set, and the other
   won't run AVDs unless "Use Host GPU" is unset. If your current setting is
   giving you OpenGL-related errors, toggle it and try again.
   
5. Like I stated in the article proper, *do not touch the VM heap size* unless
   you know what you're doing. I definitely have no idea what I'm doing, and my
   AVD sat "loading" for an hour because I idly decided to up the heap size for
   the VM.
