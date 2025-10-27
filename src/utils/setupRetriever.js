import { OllamaEmbeddings } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const embeddings = new OllamaEmbeddings({ model: "llama3.1:8b" });
const supabaseclient = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseclient,
  tableName: "documents", // default om man inte skickar in nåt här
  queryName: "match_documents", // default om man inte skickar in nåt här
});

const retrieveDocuments = vectorStore.asRetriever();

export { retrieveDocuments };
