import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise" />

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-stone-500 hover:text-stone-700 mb-12 transition-colors"
        >
          ← Back to home
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display text-stone-800 mb-8">What is Suivida?</h1>

          <div className="prose prose-stone prose-lg font-serif">
            <p>
              Suivida is a space for gentle continuation. The name combines "suivre" (to follow) and "vida" (life) — to
              follow life where it naturally leads.
            </p>

            <p>
              In a world that demands constant productivity and performance, Suivida offers an alternative: a space
              where thoughts can develop at their own pace, where ideas don't need to be immediately useful or finished
              to be valuable.
            </p>

            <p>
              This digital garden is not a blog, not a portfolio, not a product. It's a living collection of thoughts,
              notes, and essays-in-progress that grow and evolve over time.
            </p>

            <h2>The Philosophy</h2>

            <p>Suivida embraces three core principles:</p>

            <ul>
              <li>
                <strong>Arrival</strong> — Being present with what is, without rushing to what could be
              </li>
              <li>
                <strong>Branching Out</strong> — Following curiosity where it leads, creating unexpected connections
              </li>
              <li>
                <strong>Growth</strong> — Allowing ideas to develop organically through patient attention
              </li>
            </ul>

            <p>These principles guide both the structure of this space and the approach to the ideas within it.</p>

            <h2>How to Navigate</h2>

            <p>
              Unlike traditional websites with clear hierarchies and linear paths, Suivida invites wandering. Notes
              connect to other notes. Ideas reference other ideas. The structure emerges from the content rather than
              being imposed upon it.
            </p>

            <p>
              Each note shows when it was first created and when it was last updated, allowing you to see how thoughts
              evolve over time. Notes are also marked with their growth stage:
            </p>

            <ul>
              <li>
                <strong>Seedlings</strong> — New ideas, just beginning to take form
              </li>
              <li>
                <strong>Growing</strong> — Ideas with some structure but still developing
              </li>
              <li>
                <strong>Evergreen</strong> — Mature ideas that have reached a stable form
              </li>
            </ul>

            <p>
              Feel free to explore in whatever way feels natural to you. There is no right way to navigate this space.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-200 text-center">
            <Link
              href="/garden"
              className="inline-flex h-10 items-center justify-center rounded-md bg-stone-100 px-6 py-2 text-sm font-medium text-stone-800 ring-offset-background transition-colors hover:bg-stone-200 shadow-sm"
            >
              Enter the Garden
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
