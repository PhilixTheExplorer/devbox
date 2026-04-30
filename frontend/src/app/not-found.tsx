import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-full overflow-auto px-10 py-9">
      <section className="max-w-[640px] space-y-4">
        <header className="text-[10px] tracking-[2px] text-muted">
          {"// 404"}
        </header>

        <h1 className="text-[26px] font-bold tracking-[-0.5px]">
          page not found
        </h1>

        <p className="text-[13px] leading-[1.7] text-muted2">
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
