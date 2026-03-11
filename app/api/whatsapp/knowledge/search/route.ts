import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import OpenAI from 'openai'

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const query = req.nextUrl.searchParams.get('q')
  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 })
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Search unavailable' }, { status: 503 })
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    // Embed the query
    const res = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query.trim(),
    })
    const queryEmbedding = res.data[0].embedding

    // Fetch all chunks
    const chunks = await prisma.knowledgeChunk.findMany({
      select: { id: true, section: true, title: true, content: true, embedding: true },
    })

    // Score by cosine similarity
    const scored = chunks
      .filter(c => c.embedding)
      .map(c => ({
        section: c.section,
        title:   c.title,
        content: c.content,
        score:   cosineSimilarity(queryEmbedding, JSON.parse(c.embedding!)),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    return NextResponse.json({ results: scored })
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
