import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="notfound">
      <p className="eyebrow">Error 404</p>
      <h1>This page could not be found.</h1>
      <p className="notfound-copy">
        The page may have moved or the link may be incorrect. Head back to the
        homepage or jump straight to the selected work.
      </p>
      <div className="notfound-links">
        <Link href="/#home">Back to home</Link>
        <Link href="/#work">Selected Work</Link>
      </div>
    </main>
  );
}
