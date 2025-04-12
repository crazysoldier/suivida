"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"
import { Search, Filter, Sprout, Leaf, TreePine } from "lucide-react"

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [growthFilter, setGrowthFilter] = useState("all")
  const [topicFilter, setTopicFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // In a real app, this would be a fetch call to your API
    const fetchNotes = async () => {
      const response = await fetch("/api/notes")
      const data = await response.json()
      setNotes(data)
      setFilteredNotes(data)

      // Extract unique topics
      const allTopics = data.flatMap((note) => note.topics)
      setTopics([...new Set(allTopics)])
    }

    fetchNotes()
  }, [])

  useEffect(() => {
    let result = [...notes]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.excerpt.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query),
      )
    }

    // Apply growth stage filter
    if (growthFilter !== "all") {
      result = result.filter((note) => note.growthStage === growthFilter)
    }

    // Apply topic filter
    if (topicFilter !== "all") {
      result = result.filter((note) => note.topics.includes(topicFilter))
    }

    // Apply sorting
    if (sortBy === "updated") {
      result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    } else if (sortBy === "created") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredNotes(result)
  }, [notes, searchQuery, growthFilter, topicFilter, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2 text-sage-900 font-display">All Notes</h1>
          <p className="text-sage-700 font-serif">Browse through all the notes in my digital garden.</p>
        </header>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-sage-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sage-400" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 border-sage-200 focus:border-sage-300 focus:ring focus:ring-sage-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-sage-400" />
                <Select value={growthFilter} onValueChange={setGrowthFilter}>
                  <SelectTrigger className="w-[160px] border-sage-200 focus:ring-sage-200">
                    <SelectValue placeholder="Growth Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="seedling" className="flex items-center">
                      <div className="flex items-center">
                        <Sprout className="h-4 w-4 mr-2 text-lime-600" />
                        Seedlings
                      </div>
                    </SelectItem>
                    <SelectItem value="growing">
                      <div className="flex items-center">
                        <Leaf className="h-4 w-4 mr-2 text-amber-600" />
                        Growing
                      </div>
                    </SelectItem>
                    <SelectItem value="evergreen">
                      <div className="flex items-center">
                        <TreePine className="h-4 w-4 mr-2 text-emerald-600" />
                        Evergreen
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-[160px] border-sage-200 focus:ring-sage-200">
                  <SelectValue placeholder="Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] border-sage-200 focus:ring-sage-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                  <SelectItem value="created">Recently Created</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="text-xs text-sage-500">Quick filters:</span>
            <button
              onClick={() => setGrowthFilter("seedling")}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100"
            >
              <Sprout className="h-3 w-3 mr-1" />
              Seedlings
            </button>
            <button
              onClick={() => setGrowthFilter("growing")}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            >
              <Leaf className="h-3 w-3 mr-1" />
              Growing
            </button>
            <button
              onClick={() => setGrowthFilter("evergreen")}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            >
              <TreePine className="h-3 w-3 mr-1" />
              Evergreen
            </button>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-sage-200">
            <p className="text-sage-600 font-serif">No notes found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function NoteCard({ note }) {
  return (
    <Card className="h-full flex flex-col border-sage-200 bg-white hover:shadow-md transition-all duration-200 hover:border-sage-300 overflow-hidden group">
      <CardHeader className="relative border-b border-sage-100 pb-3">
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
          <CardTitle className="text-lg text-sage-800 group-hover:text-sage-900 transition-colors font-display">
            {note.title}
          </CardTitle>
          <GrowthStageBadge stage={note.growthStage} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <p className="text-sage-600 line-clamp-3 font-serif">{note.excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-3 pt-0 border-t border-sage-100 mt-auto">
        <div className="flex flex-wrap gap-2 pt-3">
          {note.topics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="text-xs bg-sage-50 text-sage-700 border-sage-200 hover:bg-sage-100"
            >
              {topic}
            </Badge>
          ))}
        </div>
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
