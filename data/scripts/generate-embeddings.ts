// data/scripts/generate-embeddings.ts
// Run: npx tsx data/scripts/generate-embeddings.ts
// Requires: OPENAI_API_KEY in .env.local

import { config } from "dotenv";
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

interface ContentChunk {
  id: string;
  category: string;
  content: string;
}

interface EmbeddingEntry extends ContentChunk {
  embedding: number[];
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "text-embedding-3-small"; // 1536 dimensions, cheapest
const BATCH_SIZE = 20;

async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });

  if (!response.ok) throw new Error(`OpenAI error: ${await response.text()}`);

  const data = await response.json();
  return data.data.map((item: any) => item.embedding);
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.error("No OPENAI_API_KEY in .env.local");
    process.exit(1);
  }

  const chunksSource = readFileSync(
    resolve(process.cwd(), "data/chunks.ts"),
    "utf-8",
  );

  const match = chunksSource.match(
    /export const chunks:\s*ContentChunk\[\]\s*=\s*(\[[\s\S]*\]);/,
  );

  if (!match) {
    console.error("Cannot parse chunks from data/chunks.ts");
    process.exit(1);
  }

  const chunks: ContentChunk[] = eval(match[1]);
  console.log(`Found ${chunks.length} chunks`);

  const results: EmbeddingEntry[] = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    console.log(
      `Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`,
    );

    const embeddings = await getEmbeddings(batch.map((c) => c.content));
    batch.forEach((chunk, j) =>
      results.push({ ...chunk, embedding: embeddings[j] }),
    );

    // Rate limit pause between batches
    if (i + BATCH_SIZE < chunks.length)
      await new Promise((r) => setTimeout(r, 200));
  }

  const outputPath = resolve(process.cwd(), "data/embeddings.json");
  writeFileSync(outputPath, JSON.stringify(results, null, 0));
  console.log(
    `✅ Generated ${results.length} embeddings → data/embeddings.json`,
  );
}

main().catch(console.error);
