import Link from "next/link"
import { getNotes } from "@/lib/notes"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sprout, Leaf, TreePine } from "lucide-react"
import { notFound } from "next/navigation"

interface Note {
  slug: string
  title: string
  excerpt: string
  content: string
  createdAt: string
  lastUpdated: string
  growthStage: "seedling" | "growing" | "evergreen"
  topics: string[]
  wordCount: number
}

interface TopicPageProps {
  params: {
    topic: string
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const notes = await getNotes()
  const topicParam = params.topic.replace(/-/g, " ")
  const actualTopic = notes
    .flatMap((note) => note.topics)
    .find((t) => t.toLowerCase() === topicParam.toLowerCase())

  if (!actualTopic) {
    notFound()
  }

  const topicNotes = notes.filter((note) => note.topics.includes(actualTopic))

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/garden"
          className="inline-flex items-center text-sm text-sage-600 hover:text-sage-800 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to garden
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2 text-sage-900 font-display capitalize">{actualTopic}</h1>
          <p className="text-sage-700 font-serif">
            {topicNotes.length} {topicNotes.length === 1 ? "note" : "notes"} exploring this topic.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicNotes.map((note: Note) => (
            <Card
              key={note.slug}
              className="border-sage-200 bg-white hover:shadow-md transition-all duration-200 hover:border-sage-300"
            >
              <CardHeader className="border-b border-sage-100 pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-sage-800 font-display">{note.title}</CardTitle>
                  <GrowthStageBadge stage={note.growthStage} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sage-600 line-clamp-2 mb-4 font-serif">{note.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {note.topics.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs bg-sage-50 text-sage-700 border-sage-200 hover:bg-sage-100"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3 pt-0 border-t border-sage-100 mt-auto">
                <div className="w-full flex justify-between items-center text-xs text-sage-500 pt-1">
                  <span>Planted: {formatDate(note.createdAt)}</span>
                  <span>Last tended: {formatDate(note.lastUpdated)}</span>
                </div>
                <Link
                  href={`/notes/${note.slug}`}
                  className="w-full inline-flex h-8 items-center justify-center rounded-md bg-sage-100 px-3 py-1 text-sm font-medium text-sage-700 ring-offset-background transition-colors hover:bg-sage-200 mt-2"
                >
                  Read note →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

interface GrowthStageBadgeProps {
  stage: "seedling" | "growing" | "evergreen"
}

function GrowthStageBadge({ stage }: GrowthStageBadgeProps) {
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