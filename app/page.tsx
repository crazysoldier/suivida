import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cream">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl mx-auto text-center space-y-16">
          <h1 className="font-serif text-3xl md:text-4xl text-stone-800 leading-relaxed tracking-wide">
            Suivida is the soft yes – where life quietly continues.
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 pt-8">
            <Link href="/garden?from=arrive" className="portal-button">
              <span>Arrive</span>
            </Link>

            <Link href="/garden?from=branch" className="portal-button">
              <span>Branch Out</span>
            </Link>

            <Link href="/garden?from=grow" className="portal-button">
              <span>Grow</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center">
        <Link
          href="/about"
          className="text-sm text-stone-500 hover:text-stone-700 transition-colors duration-300 font-serif"
        >
          What is Suivida?
        </Link>
      </footer>
    </div>
  )
}
