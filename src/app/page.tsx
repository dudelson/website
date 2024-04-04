import Image from "next/image";
import Link from "next/link";

export default function OtherPage() {
  return (
    <>
      <header className="w-full h-[75px] bg-slate-200 py-4 mx-auto">
        <div className="flex space-x-8">
          <Link href="#">Substack</Link>
          <Link href="#">Twitter</Link>
          <Link href="#">LinkedIn</Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-between px-4 py-16 mx-auto max-w-[75ch] min-h-screen">
        <section className="py-12 sm:flex">
          <div>
            <h1 className="text-2xl">David Udelson</h1>
            <h3 className="text-xl">Web developer &amp; designer, personal growth coach, &amp; curious human</h3>
          </div>
          <Image
            className="rounded-lg"
            width="250"
            height="250"
            src="/images/prof_pic_2023_small.png"
            alt="David Udelson"
          />
        </section>

        <section className="py-12">
          <h1 className="text-2xl">Software Consulting</h1>
          <h3 className="text-xl">Delightful digital experiences for solopreneurs and small businesses with heart</h3>
          <p>As a web design and development consultant, I create bespoke websites and web applications for individuals and small teams.</p>
          <CTAButton 
            text="Explore Software Consulting"
            href="#"
          />
        </section>
        
        <section className="py-12">
          <h1 className="text-2xl">Growth Coaching</h1>
          <h3 className="text-xl">One-on-one coaching for restoring agency and aliveness</h3>
          <p>As a certified Organic Intelligence® coach in training, I guide clients out of internal chaos and into connection and wholeness.</p>
          <CTAButton 
            text="Explore Growth Coaching"
            href="#"
          />
        </section>

        <section>
          <h1 className="text-2xl">Writing</h1>
          <p>Coming Soon!</p>
        </section>
      </main>
      
      <footer className="w-full h-[75px] bg-slate-200 py-4 text-center">
        <p>Copyright 2024 David Udelson. All rights reserved.</p>
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
    <button>
      <Link href={href}>
        {text}
      </Link>
    </button>
  )
}
