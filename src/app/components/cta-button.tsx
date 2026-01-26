import Link from "next/link";

export default function CTAButton(
  { text, href }: {
    text: string,
    href: string,
  }
) {
  return (
    <button className="bg-accent rounded-lg px-4 py-2">
      <Link className="no-underline" href={href}>
        <span className="text-[24px]">{text}</span>
      </Link>
    </button>
  )
}
