import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-3 border-t border-border py-[50px] text-center">
      <div className="container-custom">
        <div className="w-full items-center justify-center">
          <Link href="/" className="group flex-shrink-0">
            <div className="relative w-[140px] h-[80px]">
              <Image
                src="/assets/white_bg.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8 flex-wrap mb-7">
          {["Services", "Portfolio", "Resume", "Blog", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-text-muted font-medium hover:text-primary-3 transition-colors"
              >
                {item}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mb-7">
          <a href="#" className="social-link">
            𝕏
          </a>
          <a href="#" className="social-link">
            in
          </a>
          <a href="#" className="social-link">
            ⌘
          </a>
          <a href="#" className="social-link">
            ●
          </a>
        </div>

        <p className="text-sm text-text-muted">
          © 2024 All rights reserved by{" "}
          <a
            href="#"
            className="text-primary-3 hover:text-primary transition-colors"
          >
            ThemeJunction
          </a>{" "}
          · Built with{" "}
          <a
            href="#"
            className="text-primary-3 hover:text-primary transition-colors"
          >
            Next.js + Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
