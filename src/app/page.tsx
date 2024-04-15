import Image from "next/image";
import Link from "next/link";

export default function OtherPage() {
  return (
    <>
      <header className="w-full h-[60px] bg-salmon">
        <div className="w-full sm:w-[90ch] h-full mx-auto flex justify-between items-center px-4 sm:px-0">
          <Link href="#writing">Substack</Link>
          <Link href="https://twitter.com/dudelson_">Twitter</Link>
          <Link href="https://www.linkedin.com/in/dudelson/">LinkedIn</Link>
        </div>
      </header>

      <main className="flex flex-col px-4 py-2 sm:py-16 mx-auto max-w-[90ch] min-h-screen">
        <section className="flex flex-col sm:flex-row items-center py-4 sm:py-12">
          <Image
              className="rounded-lg order-last sm:order-none mt-4 sm:mt-0 sm:mr-8"
              width="250"
              height="250"
              src="/images/prof_pic_2023_small.png"
              alt="David Udelson"
            />
          <div className="sm:flex sm:flex-col sm:justify-between">
            <h1 className="text-[48px] sm:text-[56px]">David Udelson</h1>
            <h3 className="text-[24px] sm:text-[32px] leading-tight">Web developer &amp; designer, personal growth coach, &amp; curious human</h3>
          </div>
        </section>

        <section className="py-12">
          <h1 className="text-[48px] leading-tight mb-4 sm:text-[56px] sm:mb-0">Software Consulting</h1>
          <h3 className="text-[24px] italic leading-tight">Delightful digital experiences for solopreneurs and small businesses with heart</h3>
          <p className="text-[18px] py-8">As a web design and development consultant, I create bespoke websites and web applications for individuals and small teams.</p>
          <CTAButton 
            text="Learn More"
            href="https://www.udelson.dev/"
          />
        </section>
        
        <section className="py-12">
          <h1 className="text-[48px] leading-tight mb-4 sm:text-[56px] sm:mb-0">Growth Coaching</h1>
          <h3 className="text-[24px] italic leading-tight">One-on-one coaching for restoring agency and aliveness</h3>
          <p className="text-[18px] py-8">As an Organic Intelligence® coach in training, I guide clients out of internal chaos and into connection and wholeness.</p>
          <CTAButton 
            text="Book a Discovery Call"
            href="https://calendly.com/dudelson/discovery-call"
          />
        </section>

        <section className="py-12">
          <h1 id="writing" className="text-[48px] sm:text-[56px]">Writing</h1>
          <p className="text-[18px] py-8">Coming Soon!</p>
        </section>
      </main>
      
      <footer className="w-full h-[60px] bg-salmon flex justify-center items-center">
        <p>Copyright 2024 David Udelson.</p>
      </footer>
    </>
  )   
}

function CTAButton(
  { text, href }: {
    text: string,
    href: string,
  }
) {
  return (
    <button className="bg-salmon rounded-lg px-4 py-2">
      <Link href={href}>
        <span className="text-[24px]">{text}</span>
      </Link>
    </button>
  )
}
