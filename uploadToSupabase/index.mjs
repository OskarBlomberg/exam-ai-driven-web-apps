import { readFile } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

try {
  const text = await readFile(
    `${process.cwd()}/technova-ab-faq-policydokument.txt`,
    "utf-8"
  );
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ["\n\n", "\n", " ", ""],
    chunkOverlap: 100,
  });

  const output = await textSplitter.createDocuments([text]);
  console.log(output);
  const client = createClient(SUPABASE_URL, SUPABASE_API_KEY);

  await SupabaseVectorStore.fromDocuments(
    output,
    new OllamaEmbeddings({ model: "llama3.1:8b" }),
    { client, tableName: "documents" }
  );
} catch (error) {
  console.error(error);
}
