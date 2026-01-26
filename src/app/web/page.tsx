import Image from "next/image";
import CTAButton from "../components/cta-button";
import Link from "next/link";

export default function WebDevPage() {
  return (
    <>
      <main className="flex flex-col px-4 py-2 sm:py-16 mx-auto max-w-[90ch] min-h-screen">
        <section id="hero" className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start">
          <Image
            className="w-[200px] rounded-2xl drop-shadow"
            width={550}
            height={550}
            src="/images/prof_pic_2023_small.png"
            alt="David Udelson, web and shopify developer"
          />
          <div className="flex flex-col space-y-4 pl-4">
            <h1 className="text-4xl pt-4 sm:pt-0">
              I&rsquo;m David Udelson, Shopify expert.
            </h1>
            <h3 className="text-2xl">
              I create beautiful and functional storefronts for small businesses with heart.
            </h3>

          </div>
        </section>

        <div className="my-8">
          <CTAButton
            text="Book a discovery call"
            href="https://calendly.com/dudelson/discovery-call"
          />
        </div>

        <section id="banner-testimonial" className="p-6 mb-8">
          <div className="bg-[#ffecbb] rounded-lg font-xl p-4 drop-shadow">
            <p>
              <span className="font-bold">David is the definition of efficient, concise and reliable. </span>
              He is a Shopify expert!
              He helped me create an amazing website for my beauty store. This was my first site
              and I did not know what to expect. David provided me with clear instructions and
              expectations to help me reach my goal. He was always quick to respond and provide
              recommendations for the website, which was extremely helpful for me.
            </p>
            <p className="mt-4 pl-2 font-medium">
              &mdash;
              <Link
                className="ml-2 underline"
                href="https://kaoricosmetics.com/"
              >
                Briana U.
              </Link>
              , Founder of Kaori Cosmetics
            </p>
          </div>
        </section>

        <section className="p-6 mb-8">
          <h1 className="text-3xl italic text-center my-4">~ My Services ~</h1>
          {/* I help my clients in 3 ways:
                1. Bespoke website and webapp design: I deliver a white-glove experience and a site that's
                  entirely personalized to you. [Learn more about my process](#).
                2. Enhancements and Bug Fixes: Hire me for a day to implement single features or trim down
                  your list of site bugfixes
                3. Site Audits: I'll take a fined-toothed comb to your site and present you with a video
                  walkthrough of where visitor retention and engagement could be improved, plus a written summary
          */}
          <p>I offer the following services:</p>
          <ul className="list-disc px-8 py-4">
            <li>
              <span className="font-bold">Bespoke website and webapp design: </span>
              I deliver a white-glove experience and a site that&rsquo;s entirely personalized to you.
            </li>
            <li>
              <span className="font-bold">Website Enhancements and Bug Fixes: </span>
              Hire me for a day to implement features or squash some bugs.
            </li>
            <li>
              <span className="font-bold">Site Audits: </span>
              I&rsquo;ll take a fined-toothed comb to your site and present you with a video
              walkthrough of where visitor retention and engagement could be improved, plus a written
              summary with key action items.
            </li>
            <li>
              <span className="font-bold">Custom Apps: </span>
              Need automation or funcitonality particular to your situation? I create solutions that are tailored to your unique needs.
            </li>
          </ul>
          <div className="text-center my-8">
            <CTAButton
              text="Book a discovery call"
              href="https://calendly.com/dudelson/discovery-call"
            />
          </div>
        </section>

        {/* Soul Journey testimonial (Connie) */}
        {/*
        <section id="banner-testimonial" className="p-6 mb-8">
          <div className="bg-[#ffecbb] rounded-lg font-xl p-4">
            <p>
              <span className="font-bold">David was the ideal web developer to work with! </span>
              He asked thoughtful questions to ensure he
              fully grasped my vision, and broke down complex technical concepts in a way that was easy for
              me to understand. His communication was always on point, and his attention to detail was
              exceptional. The end result is a website that perfectly reflects my brand and messaging
              &mdash; all thanks to David&rsquo;s talent and hard work. I highly recommend him to anyone
              looking for a web developer who truly listens and delivers.
            </p>
            <p className="mt-4 pl-2 font-medium">
              &mdash;
              <Link
                className="ml-2 underline"
                href="https://www.souljourneyhealingandwellness.com/"
              >
                Connie D.
              </Link>
              , Founder of Soul Journey Healing and Wellness
            </p>
          </div>
        </section>
        */}

        {/* Mousepad co testimonial */}
        <section id="banner-testimonial" className="p-6 mb-8">
          <div className="bg-[#ffecbb] rounded-lg font-xl p-4">
            <p>
              <span className="font-bold">David immediately understood my vision. </span>
              I would absolutely recommend hiring David. He is a very talented and intuitive
              developer who was able to very quickly accomplish what would have taken an
              amateur (like myself) 10 times longer to get completed... I needed a custom app
              built to allow
              my team to automate a very time consuming task, and was able to implement some
              very clever logic that really improves the time it takes to setup new Shopify
              products.
            </p>
            <p className="mt-4 pl-2 font-medium">
              &mdash;
              <Link
                className="ml-2 underline"
                href="https://themousepadcompany.com/"
              >
                Trevor Cotton
              </Link>
              , Owner of The Mousepad Company
            </p>
          </div>
        </section>

        <section className="p-6 mb-8">
          <h1 className="text-3xl italic text-center my-4">~ Past Work ~</h1>

          {/* JPP */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-[200px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/jubilees_pot_pies.png"
              alt="Jubilee's Pot Pies screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://jubileespotpies.com/">Jubilee&apos;s Pot Pies</Link>
                : Warm and professional Shopify build for small business
              </h3>
              <p className="">
                Designed and developed landing, menu, and pages for pot pie business.
              </p>
            </div>
          </div>
          {/* milona paris */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-[200px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/milona.png"
              alt="RPGMe screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://milona-paris.com/">Milona Paris</Link>
                : Custom Product Page for European Jeweler
              </h3>
              <p className="">
                Custom variant inputs, as well as custom input fields and validation sourced from product metafields.
              </p>
            </div>
          </div>
          {/* rpgme */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-[200px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/rpgme.png"
              alt="RPGMe screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://www.rpgme.ai/">RPGMe</Link>
                : Landing Page for Unique AI Product
              </h3>
              <p className="">
                Implemented an animation-rich, full-screen landing page and preorder flow for AI-generated custom video games as one half of web consultancy{' '}
                <a className="underline" href="https://www.loam.works">loam.works</a>
                . Includes Shopify and Klaviyo integrations.
              </p>
            </div>
          </div>
          {/* kaori */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-[200px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/kaori.png"
              alt="Kaori Cosmetics screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://kaoricosmetics.com/">Kaori Cosmetics</Link>
                : Trendy build for new cosmetics business
              </h3>
              <p className="">
                Store setup for new cosmetics business specializing in Japanese imports.
                Implemented new theme and full customizations.
              </p>
            </div>
          </div>
          {/* cactology */}
          {/* CAR */}

          {/* non-Shopify projects */}
          {/*
          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-auto sm:h-[150px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/rpgme.png"
              alt="RPGMe screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://www.rpgme.ai/">RPGMe</Link>
                : Landing Page for Unique AI Product
              </h3>
              <p className="">
                Implemented an animation-rich, full-screen landing page and preorder flow for AI-generated custom video games as one half of web consultancy{' '}
                <a className="underline" href="https://www.loam.works">loam.works</a>
                . Includes Shopify and Klaviyo integrations.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start pt-8 sm:py-4">
            <Image
              className="w-full sm:w-auto sm:h-[150px] pb-4 sm:pb-0"
              width={225}
              height={150}
              src="/images/futura.webp"
              alt="Futura screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://www.futura.family/">Futura</Link>
                : Website for Intentional Community
              </h3>
              <p className="">
                Collaborated with project leader and a web designer to implement this website,
                which explains the project goals to philanthropists and government partners.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start py-32 sm:py-4">
            <Image
              className="w-full sm:w-auto sm:h-[150px] pb-4 sm:pb-0"
              width={200}
              height={150}
              src="/images/soul-journey.png"
              alt="Soul Journey Healing and Wellness screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://www.souljourneyhealingandwellness.com/">Soul Journey</Link>
                : Website for Reiki Practitioner
              </h3>
              <p className="">
                Designed and implemented this website for a reiki practice, aimed at spreading the word
                and giving clients important information (answering questions, etc.) and
                allowing appointments to be scheduled.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start pb-8 sm:py-4">
            <Image
              className="w-full sm:w-auto sm:h-[150px] pb-4 sm:pb-0"
              width={200}
              height={150}
              src="/images/bodytrading.png"
              alt="Bodytrading screenshot"
            />
            <div className="px-4">
              <h3 className="text-xl font-bold">
                <Link className="underline" href="https://www.bodytrading.com/collections/spare-parts">Bodytrading</Link>
                : Enhancement for Fitness Equipment E-Commerce Store</h3>
              <p className="">
                I designed an implemented a custom search feature for a online fitness retainer using
                the Shopify platform.
              </p>
            </div>
          </div>
          */}
        </section>
      </main>
    </>
  );
}
