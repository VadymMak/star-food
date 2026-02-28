// src/lib/rag.ts
// RAG (Retrieval-Augmented Generation) engine
// Loads embeddings, converts queries to vectors, finds relevant chunks

import embeddingsData from "../../data/embeddings.json";

interface EmbeddingEntry {
  id: string;
  category: string;
  content: string;
  embedding: number[];
}

const embeddings: EmbeddingEntry[] = embeddingsData as EmbeddingEntry[];

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const mag = Math.sqrt(normA) * Math.sqrt(normB);
  return mag === 0 ? 0 : dot / mag;
}

async function getQueryEmbedding(query: string): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: query }),
  });

  if (!response.ok) throw new Error("Failed to get query embedding");

  const data = await response.json();
  return data.data[0].embedding;
}

export interface SearchResult {
  id: string;
  category: string;
  content: string;
  score: number;
}

export async function searchContext(
  query: string,
  topK = 4,
  minScore = 0.3,
): Promise<SearchResult[]> {
  const qEmb = await getQueryEmbedding(query);

  return embeddings
    .map((e) => ({ ...e, score: cosineSimilarity(qEmb, e.embedding) }))
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function formatContext(results: SearchResult[]): string {
  if (!results.length) return "";
  return (
    "\n\nRELEVANT CONTEXT:\n" +
    results
      .map((r) => `[${r.category.toUpperCase()}] ${r.content}`)
      .join("\n\n")
  );
}
