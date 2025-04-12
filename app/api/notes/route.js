import { getNotes } from "@/lib/notes"

export async function GET() {
  const notes = await getNotes()
  return Response.json(notes)
}
