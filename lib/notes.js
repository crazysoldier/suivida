// This is a mock implementation - in a real app, you'd fetch from a database or file system

const notes = [
  {
    slug: "digital-garden-philosophy",
    title: "The Philosophy of Digital Gardens",
    excerpt: "Exploring the concept of digital gardens as spaces for learning in public and growing ideas over time.",
    content: `
      # The Philosophy of Digital Gardens

      Digital gardens are about learning in public. They're a space where ideas can grow and evolve over time, without the pressure of being "finished" or "perfect."

      ## Key Principles

      - **Non-linear**: Unlike blogs, digital gardens don't have to be chronological
      - **Work in progress**: Ideas can be in various stages of completion
      - **Interconnected**: Notes can link to each other, creating a web of knowledge
      - **Evolving**: Content can be revisited and updated as thinking evolves

      I'm still exploring how [[digital garden vs blog]] compare, and what makes each format unique.

      ## Why Garden?

      Traditional publishing pushes us to only share polished, complete thoughts. But that's not how thinking works. Real thinking is messy, incomplete, and constantly evolving.

      By gardening in public, we:

      1. Share knowledge before it's "ready"
      2. Get feedback earlier in the process
      3. Build in public
      4. Create unexpected connections

      I'm particularly interested in how digital gardens can become [[tools for thought]] and support [[networked thinking]].
    `,
    createdAt: "2023-03-15T12:00:00Z",
    lastUpdated: "2023-08-22T15:30:00Z",
    growthStage: "growing",
    topics: ["Digital Gardens", "Knowledge Management", "Learning"],
    wordCount: 187,
  },
  {
    slug: "tools-for-thought",
    title: "Tools for Thought",
    excerpt: "Examining how different tools shape our thinking process and enable new forms of knowledge work.",
    content: `
      # Tools for Thought

      This is a seedling note on tools for thought - software and systems that help us think better.

      ## What Makes a Good Thinking Tool?

      I'm still figuring this out, but some initial criteria:

      - Reduces friction between having an idea and capturing it
      - Enables connections between ideas
      - Grows with you over time
      - Supports different modes of thinking

      ## Tools I'm Exploring

      - Roam Research
      - Obsidian
      - Notion
      - This digital garden itself!

      I need to expand this note with more thoughts on how [[networked thinking]] relates to tools for thought.
    `,
    createdAt: "2023-06-10T09:15:00Z",
    lastUpdated: "2023-06-10T09:15:00Z",
    growthStage: "seedling",
    topics: ["Tools for Thought", "Productivity", "Knowledge Management"],
    wordCount: 112,
  },
  {
    slug: "networked-thinking",
    title: "Networked Thinking",
    excerpt: "How connecting ideas in a network rather than a hierarchy can lead to new insights and creativity.",
    content: `
      # Networked Thinking

      Networked thinking is about connecting ideas in non-linear ways, similar to how our brains actually work.

      ## Key Concepts

      - Ideas are nodes in a network
      - Connections between ideas are as important as the ideas themselves
      - New insights emerge from unexpected connections
      - Knowledge builds through linking, not just collecting

      ## Practical Applications

      I've found networked thinking particularly useful for:

      - Writing (connecting concepts across different domains)
      - Problem-solving (seeing patterns and relationships)
      - Learning (building on existing knowledge structures)

      This approach pairs well with [[tools for thought]] that support bidirectional linking and networked knowledge.

      ## Historical Context

      The concept has roots in hypertext (Ted Nelson), associative trails (Vannevar Bush's Memex), and has been revitalized by modern tools like Roam  associative trails (Vannevar Bush's Memex), and has been revitalized by modern tools like Roam Research, Obsidian, and other modern PKM (Personal Knowledge Management) tools.
    `,
    createdAt: "2023-05-02T14:20:00Z",
    lastUpdated: "2023-09-01T11:45:00Z",
    growthStage: "evergreen",
    topics: ["Knowledge Management", "Thinking", "Creativity"],
    wordCount: 203,
  },
  {
    slug: "digital-garden-vs-blog",
    title: "Digital Garden vs Blog: Different Forms of Online Writing",
    excerpt:
      "Comparing the structured, chronological nature of blogs with the evolving, interconnected nature of digital gardens.",
    content: `
      # Digital Garden vs Blog

      This is a growing note comparing two different approaches to sharing ideas online.

      ## Blogs

      - Chronological
      - Finished pieces
      - Publication-focused
      - Typically more polished
      - Often optimized for audience and distribution

      ## Digital Gardens

      - Non-chronological
      - Works in progress
      - Growth-focused
      - Various stages of completion
      - Primarily for the gardener's own thinking

      ## When to Use Each

      I'm finding that blogs work better for:
      - Announcements
      - Time-sensitive content
      - Fully formed arguments
      - Content marketing

      While gardens excel at:
      - Evolving ideas
      - Interconnected concepts
      - Learning in public
      - Building knowledge over time

      This connects to my broader thoughts on [[digital garden philosophy]].
    `,
    createdAt: "2023-04-18T10:30:00Z",
    lastUpdated: "2023-07-12T16:20:00Z",
    growthStage: "growing",
    topics: ["Digital Gardens", "Blogging", "Writing"],
    wordCount: 156,
  },
  {
    slug: "progressive-summarization",
    title: "Progressive Summarization",
    excerpt:
      "A technique for processing information by summarizing it in layers, making it more useful for future retrieval.",
    content: `
      # Progressive Summarization

      Just starting to explore this concept from Tiago Forte. This is a very early seedling note.

      ## Basic Concept

      Progressive summarization involves highlighting and summarizing content in layers:
      
      1. Original content
      2. Bold important points
      3. Highlight the most important of the bold points
      4. Write an executive summary
      5. Add your own insights

      Need to explore how this relates to [[networked thinking]] and whether it works well in a digital garden context.
    `,
    createdAt: "2023-09-05T08:45:00Z",
    lastUpdated: "2023-09-05T08:45:00Z",
    growthStage: "seedling",
    topics: ["Note-taking", "Knowledge Management", "Learning"],
    wordCount: 89,
  },
  {
    slug: "writing-as-thinking",
    title: "Writing as a Tool for Thinking",
    excerpt: "How the act of writing clarifies thought and serves as an extension of our cognitive processes.",
    content: `
      # Writing as a Tool for Thinking

      This is an evergreen note on how writing helps us think better.

      ## Key Insights

      - Writing forces clarity: vague thoughts become obvious when written down
      - Writing extends working memory: we can manipulate more complex ideas when externalized
      - Writing enables iteration: thoughts can be revised and improved over time
      - Writing creates a dialogue with yourself: past you can talk to future you

      ## Practical Applications

      I've found several practices particularly useful:
      
      - Morning pages: stream of consciousness writing to clear mental space
      - Outline thinking: structuring thoughts hierarchically before diving in
      - Exploratory writing: writing to discover what I think, not just to express it
      - Revising as thinking: each revision pass deepens understanding

      This connects to my interest in [[tools for thought]] and how different mediums shape our thinking process.

      ## Historical Context

      Many great thinkers have used writing as their primary thinking tool:
      
      - Luhmann's Zettelkasten
      - Darwin's notebooks
      - Da Vinci's journals
      - Einstein's thought experiments

      The act of writing seems to be a fundamental amplifier of human thought.
    `,
    createdAt: "2023-02-10T11:20:00Z",
    lastUpdated: "2023-08-15T14:10:00Z",
    growthStage: "evergreen",
    topics: ["Writing", "Thinking", "Creativity"],
    wordCount: 215,
  },
]

export async function getNotes() {
  // In a real app, you'd fetch from a database or file system
  return notes
}

export async function getNoteBySlug(slug) {
  // In a real app, you'd fetch from a database or file system
  return notes.find((note) => note.slug === slug)
}

export async function getRelatedNotes(note) {
  // In a real app, you'd have a more sophisticated algorithm
  // Here we're just matching on topics
  return notes.filter((n) => n.slug !== note.slug && n.topics.some((topic) => note.topics.includes(topic))).slice(0, 2)
}
