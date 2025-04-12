"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getNotes } from "@/lib/notes"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import { Search, Sprout, Leaf, TreePine } from "lucide-react"

// Quote collections based on entry point
const quotes = {
  arrive: [
    "The garden awaits your footsteps with patient soil.",
    "To arrive is to begin the quiet conversation with yourself.",
    "Here, thoughts are seeds waiting for your attention.",
    "Welcome to the space between thinking and knowing.",
    "The first step into the garden is always an act of hope.",
  ],
  branch: [
    "Ideas connect like branches reaching for distant thoughts.",
    "To branch out is to follow curiosity without destination.",
    "The unexpected connections are where wisdom grows.",
    "Between the known paths lie the most interesting journeys.",
    "Let your thoughts wander into unfamiliar territories.",
  ],
  grow: [
    "Growth happens in the quiet spaces between words.",
    "Nurture the seedling thoughts until they stand on their own.",
    "The garden grows not by force but by patient attention.",
    "What you tend to will flourish; what you observe will deepen.",
    "Every revisited thought grows more complex, more true.",
  ],
}

export default function GardenPage() {
  const searchParams = useSearchParams()
  const entryPoint = searchParams.get("from") || "arrive"
  const [randomQuote, setRandomQuote] = useState("")
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Get a random quote based on entry point
  useEffect(() => {
    const quoteCollection = quotes[entryPoint] || quotes.arrive
    const randomIndex = Math.floor(Math.random() * quoteCollection.length)
    setRandomQuote(quoteCollection[randomIndex])
  }, [entryPoint])

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const response = await fetch("/api/notes")
        const data = await response.json()
        setNotes(data)
      } catch (error) {
        console.error("Error fetching notes:", error)
        // Use sample data as fallback
        setNotes(await getNotes())
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [])

  // Get the most recently updated notes
  const recentlyUpdated = [...notes]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3)

  // Get notes by growth stage
  const seedlings = notes.filter((note) => note.growthStage === "seedling")
  const growing = notes.filter((note) => note.growthStage === "growing")
  const evergreen = notes.filter((note) => note.growthStage === "evergreen")

  return (
    <div className="min-h-screen bg-cream">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise" />

      <div className="container mx-auto px-4 py-12">
        {/* Quote Section */}
        <section className="mb-16 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl text-stone-200 font-display">
                "
              </div>
              <p className="font-serif text-xl md:text-2xl text-stone-700 italic leading-relaxed">{randomQuote}</p>
              <div className="mt-6 text-sm text-stone-400 uppercase tracking-widest">
                {entryPoint === "arrive" ? "On Arrival" : entryPoint === "branch" ? "On Branching Out" : "On Growth"}
              </div>
            </div>
          </div>
        </section>

        <header className="mb-12">
          <h1 className="text-4xl font-display text-stone-800 mb-4 text-center">The Garden</h1>
          <p className="font-serif text-lg text-stone-600 text-center max-w-2xl mx-auto">
            A space for ideas, thoughts, and essays-in-progress. This is where life quietly continues.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-2 h-2 bg-stone-300 rounded-full animate-pulse mx-1"></div>
            <div
              className="w-2 h-2 bg-stone-300 rounded-full animate-pulse mx-1"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-stone-300 rounded-full animate-pulse mx-1"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8 mb-16">
              <div className="flex-1">
                <h2 className="text-2xl font-display text-stone-800 mb-4">Welcome to my garden</h2>
                <div className="prose prose-stone font-serif">
                  <p className="mb-4">
                    Unlike a blog, this digital garden is a collection of evolving ideas, not finished posts. Some notes
                    are seedlings, just planted. Others are growing steadily. A few have matured into evergreen notes.
                  </p>
                  <p className="mb-4">
                    Feel free to wander, explore connections between ideas, and watch thoughts evolve over time. Each
                    note shows when it was planted and last tended to.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Link
                    href="/notes"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-stone-100 px-6 py-2 text-sm font-medium text-stone-800 ring-offset-background transition-colors hover:bg-stone-200 shadow-sm"
                  >
                    Browse All Notes
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-stone-200 bg-white px-6 py-2 text-sm font-medium text-stone-700 ring-offset-background transition-colors hover:bg-stone-50 shadow-sm"
                  >
                    About This Garden
                  </Link>
                </div>
              </div>

              <Card className="flex-1 border-stone-200 bg-white/80 backdrop-blur-sm shadow-sm">
                <CardHeader className="border-b border-stone-100">
                  <CardTitle className="text-stone-800 font-display">Recently Tended</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {recentlyUpdated.map((note) => (
                    <Link key={note.slug} href={`/notes/${note.slug}`} className="block">
                      <div className="p-4 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-stone-800">{note.title}</h3>
                            <p className="text-sm text-stone-600 line-clamp-2 font-serif">{note.excerpt}</p>
                          </div>
                          <GrowthStageBadge stage={note.growthStage} />
                        </div>
                        <div className="text-xs text-stone-500 mt-2">Last tended: {formatDate(note.lastUpdated)}</div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-stone-100 pt-4">
                  <Link
                    href="/notes?sort=recent"
                    className="text-sm text-stone-600 hover:text-stone-800 hover:underline"
                  >
                    View all recently updated notes →
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display text-stone-800">Explore by Growth Stage</h2>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-400" />
                  <Input
                    type="search"
                    placeholder="Search notes..."
                    className="pl-8 border-stone-200 bg-white/80 focus:border-stone-300 focus:ring focus:ring-stone-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-8 bg-stone-100/50 p-1">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-sm"
                  >
                    All Notes ({notes.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="seedlings"
                    className="data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-sm"
                  >
                    <Sprout className="mr-1 h-4 w-4" />
                    Seedlings ({seedlings.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="growing"
                    className="data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-sm"
                  >
                    <Leaf className="mr-1 h-4 w-4" />
                    Growing ({growing.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="evergreen"
                    className="data-[state=active]:bg-white data-[state=active]:text-stone-800 data-[state=active]:shadow-sm"
                  >
                    <TreePine className="mr-1 h-4 w-4" />
                    Evergreen ({evergreen.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.slice(0, 6).map((note) => (
                    <NoteCard key={note.slug} note={note} />
                  ))}
                </TabsContent>

                <TabsContent value="seedlings" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seedlings.slice(0, 6).map((note) => (
                    <NoteCard key={note.slug} note={note} />
                  ))}
                </TabsContent>

                <TabsContent value="growing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {growing.slice(0, 6).map((note) => (
                    <NoteCard key={note.slug} note={note} />
                  ))}
                </TabsContent>

                <TabsContent value="evergreen" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {evergreen.slice(0, 6).map((note) => (
                    <NoteCard key={note.slug} note={note} />
                  ))}
                </TabsContent>
              </Tabs>

              <div className="text-center mt-10">
                <Link
                  href="/notes"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-stone-100 px-8 py-2 text-sm font-medium text-stone-800 ring-offset-background transition-colors hover:bg-stone-200 shadow-sm"
                >
                  View All Notes
                </Link>
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-display text-stone-800 mb-6">Topic Clusters</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "Philosophy",
                  "Technology",
                  "Creativity",
                  "Learning",
                  "Psychology",
                  "Systems Thinking",
                  "Personal Growth",
                  "Writing",
                ].map((topic) => (
                  <Link
                    key={topic}
                    href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors text-center bg-white/80 shadow-sm hover:shadow-md hover:border-stone-300"
                  >
                    <span className="text-stone-700 font-medium">{topic}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        <footer className="mt-16 pt-8 border-t border-stone-200 text-center text-sm text-stone-500">
          <p className="font-serif italic">
            "The garden is a metaphor for the mind: a place where ideas grow, connections form, and understanding
            deepens."
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/" className="text-stone-600 hover:text-stone-800 hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-800 hover:underline">
              About
            </Link>
            <Link href="/notes" className="text-stone-600 hover:text-stone-800 hover:underline">
              Notes
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

function NoteCard({ note }) {
  return (
    <Card className="h-full flex flex-col border-stone-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-200 hover:border-stone-300 overflow-hidden group">
      <CardHeader className="relative border-b border-stone-100 pb-3">
        <div
          className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent"
          style={{
            background:
              note.growthStage === "seedling"
                ? "linear-gradient(to right, transparent, #84cc16)"
                : note.growthStage === "growing"
                  ? "linear-gradient(to right, transparent, #f59e0b)"
                  : "linear-gradient(to right, transparent, #10b981)",
          }}
        />
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-stone-800 group-hover:text-stone-900 transition-colors font-display">
            {note.title}
          </CardTitle>
          <GrowthStageBadge stage={note.growthStage} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <p className="text-stone-600 line-clamp-3 font-serif">{note.excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-3 pt-0 border-t border-stone-100 mt-auto">
        <div className="flex flex-wrap gap-2 pt-3">
          {note.topics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="text-xs bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
            >
              {topic}
            </Badge>
          ))}
        </div>
        <div className="w-full flex justify-between items-center text-xs text-stone-500 pt-1">
          <span>Planted: {formatDate(note.createdAt)}</span>
          <span>Last tended: {formatDate(note.lastUpdated)}</span>
        </div>
        <Link
          href={`/notes/${note.slug}`}
          className="w-full inline-flex h-8 items-center justify-center rounded-md bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 ring-offset-background transition-colors hover:bg-stone-200 mt-2"
        >
          Read note →
        </Link>
      </CardFooter>
    </Card>
  )
}

function GrowthStageBadge({ stage }) {
  const variants = {
    seedling: {
      class: "bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100",
      label: "Seedling",
      icon: <Sprout className="h-3 w-3 mr-1" />,
    },
    growing: {
      class: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      label: "Growing",
      icon: <Leaf className="h-3 w-3 mr-1" />,
    },
    evergreen: {
      class: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      label: "Evergreen",
      icon: <TreePine className="h-3 w-3 mr-1" />,
    },
  }

  const { class: className, label, icon } = variants[stage]

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${className}`}>
      {icon}
      {label}
    </span>
  )
}
