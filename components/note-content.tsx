"use client"

import { useEffect, useState } from "react"

export default function NoteContent({ content }) {
  const [processedContent, setProcessedContent] = useState("")

  useEffect(() => {
    // Process content to add wiki-style links [[link]]
    // In a real app, you'd use a proper MDX renderer
    const processed = content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
      const slug = p1.toLowerCase().replace(/\s+/g, "-")
      return `<a href="/notes/${slug}" class="text-sage-600 underline underline-offset-4 hover:text-sage-800 transition-colors">${p1}</a>`
    })

    setProcessedContent(processed)
  }, [content])

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />
}
