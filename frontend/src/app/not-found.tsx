import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-full overflow-auto px-page-x py-page-y">
      <section className="max-w-readable space-y-4">
        <header className="text-2xs tracking-widest text-muted">
          {"// 404"}
        </header>

        <h1 className="text-2xl font-bold">page not found</h1>

        <p className="text-ui leading-relaxed text-muted2">
          the page or tool you are looking for doesn't exist.
          <br />
          <Link href="/" className="inline-block mt-4 text-accent no-underline">
            ← return home
          </Link>
        </p>
      </section>
    </main>
  );
}
