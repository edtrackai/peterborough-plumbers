// Seed knowledge base with handbook chunks + OpenAI embeddings
// Run: npx tsx prisma/seed-knowledge.ts

import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'
import { KNOWLEDGE_CHUNKS } from './knowledge-chunks'

const prisma = new PrismaClient()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return res.data[0].embedding
}

async function main() {
  console.log(`Seeding ${KNOWLEDGE_CHUNKS.length} knowledge chunks...`)

  // Clear existing
  await prisma.knowledgeChunk.deleteMany()
  console.log('Cleared existing chunks.')

  for (const chunk of KNOWLEDGE_CHUNKS) {
    const embedding = await embed(`${chunk.title}\n\n${chunk.content}`)

    await prisma.knowledgeChunk.create({
      data: {
        section: chunk.section,
        title: chunk.title,
        content: chunk.content,
        embedding: JSON.stringify(embedding),
      },
    })

    console.log(`✅  [${chunk.section}] ${chunk.title}`)

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200))
  }

  console.log('\nDone! Knowledge base seeded.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
