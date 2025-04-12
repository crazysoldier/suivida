import Link from "next/link"
import { getNoteBySlug, getRelatedNotes } from "@/lib/notes"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Sprout, Leaf, TreePine } from "lucide-react"
import { notFound } from "next/navigation"
import NoteContent from "@/components/note-content"

export default async function NotePage({ params }) {
  const note = await getNoteBySlug(params.slug)

  if (!note) {
    notFound()
  }

  const relatedNotes = await getRelatedNotes(note)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/notes"
          className="inline-flex items-center text-sm text-sage-600 hover:text-sage-800 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all notes
        </Link>

        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {note.topics.map((topic) => (
                <Link key={topic} href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge variant="outline" className="bg-sage-50 text-sage-700 border-sage-200 hover:bg-sage-100">
                    {topic}
                  </Badge>
                </Link>
              ))}
              <GrowthStageBadge stage={note.growthStage} />
            </div>

            <h1 className="text-4xl font-bold mb-4 text-sage-900 font-display">{note.title}</h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-sage-600 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Planted: {formatDate(note.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Last tended: {formatDate(note.lastUpdated)}</span>
              </div>
            </div>

            {note.growthStage !== "evergreen" && (
              <div
                className={`rounded-md p-4 mb-6 ${
                  note.growthStage === "seedling"
                    ? "bg-lime-50 border border-lime-200 text-lime-800"
                    : "bg-amber-50 border border-amber-200 text-amber-800"
                }`}
              >
                <p className="text-sm flex items-center">
                  {note.growthStage === "seedling" ? (
                    <Sprout className="h-4 w-4 mr-2" />
                  ) : (
                    <Leaf className="h-4 w-4 mr-2" />
                  )}
                  This is a {note.growthStage === "seedling" ? "seedling" : "growing"} note. It's still evolving and may
                  change significantly over time.
                </p>
              </div>
            )}

            <div className="prose prose-sage max-w-none font-serif">
              <NoteContent content={note.content} />
            </div>

            <div className="mt-12 pt-8 border-t border-sage-200">
              <h2 className="text-xl font-semibold mb-4 text-sage-800 font-display">Metadata</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <dt className="text-sage-500">Created</dt>
                  <dd className="text-sage-700">{formatDate(note.createdAt, true)}</dd>
                </div>
                <div>
                  <dt className="text-sage-500">Last Updated</dt>
                  <dd className="text-sage-700">{formatDate(note.lastUpdated, true)}</dd>
                </div>
                <div>
                  <dt className="text-sage-500">Growth Stage</dt>
                  <dd className="capitalize text-sage-700 flex items-center">
                    {note.growthStage === "seedling" && <Sprout className="h-4 w-4 mr-1 text-lime-600" />}
                    {note.growthStage === "growing" && <Leaf className="h-4 w-4 mr-1 text-amber-600" />}
                    {note.growthStage === "evergreen" && <TreePine className="h-4 w-4 mr-1 text-emerald-600" />}
                    {note.growthStage}
                  </dd>
                </div>
                <div>
                  <dt className="text-sage-500">Word Count</dt>
                  <dd className="text-sage-700">{note.wordCount} words</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        {relatedNotes.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-sage-800 font-display">Related Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedNotes.map((relatedNote) => (
                <Card
                  key={relatedNote.slug}
                  className="border-sage-200 bg-white hover:shadow-md transition-all duration-200 hover:border-sage-300"
                >
                  <CardHeader className="border-b border-sage-100 pb-3">
                    <CardTitle className="text-lg text-sage-800 font-display">{relatedNote.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sage-600 line-clamp-2 mb-4 font-serif">{relatedNote.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-sage-500">
                      <span>Last tended: {formatDate(relatedNote.lastUpdated)}</span>
                      <GrowthStageBadge stage={relatedNote.growthStage} />
                    </div>
                    <Link
                      href={`/notes/${relatedNote.slug}`}
                      className="inline-flex items-center text-sm text-sage-600 hover:text-sage-800 hover:underline mt-4"
                    >
                      Read note →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t border-sage-200 text-center text-sm text-sage-500">
          <p className="font-serif italic">
            "The garden is a metaphor for the mind: a place where ideas grow, connections form, and understanding
            deepens."
          </p>
        </footer>
      </div>
    </div>
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
