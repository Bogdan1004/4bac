import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.1:8b";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

const SYSTEM_PROMPT = `Ești un profesor de programare C++ pentru elevi de liceu din România care participă la olimpiade și BAC.
Studentul lucrează la o problemă de programare și are nevoie de ajutor.

REGULI STRICTE:
- NU oferi niciodată codul complet al soluției sau algoritmul complet pas cu pas
- NU rezolva problema în locul elevului
- Oferă DOAR sugestii, întrebări ghidatoare și idei de abordare
- Poți sugera tipuri de algoritmi relevanți (ex: "Poate ar fi util să te gândești la programare dinamică")
- Poți indica structuri de date potrivite fără a da implementarea
- Pune întrebări care îl fac pe elev să gândească singur
- Dacă elevul încearcă să obțină soluția directă, redirecționează-l politicos
- Răspunde întotdeauna în română, într-un ton prietenos și încurajator
- Ține răspunsurile scurte și la obiect (max 3-4 propoziții per mesaj)`;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, problemTitle, problemDescription } = await req.json() as {
    messages: { role: "user" | "assistant"; content: string }[];
    problemTitle: string;
    problemDescription: string;
  };

  if (!messages?.length) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  const systemWithContext = `${SYSTEM_PROMPT}

Problema la care lucrează elevul:
Titlu: ${problemTitle}
Descriere: ${problemDescription?.slice(0, 1200)}`;

  // Use Groq if API key is set, otherwise fall back to local Ollama
  if (GROQ_API_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: systemWithContext },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      });

      if (!res.ok) throw new Error(`Groq responded with ${res.status}`);

      const data = await res.json() as { choices?: { message: { content: string } }[] };
      const text = data.choices?.[0]?.message?.content ?? "";
      return NextResponse.json({ response: text });
    } catch (err) {
      console.error("[chat/groq]", err);
      return NextResponse.json({ error: "Serviciul AI nu este disponibil momentan." }, { status: 503 });
    }
  }

  // Local Ollama fallback (development)
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: "system", content: systemWithContext },
          ...messages,
        ],
        stream: false,
        options: { temperature: 0.7, num_predict: 512 },
      }),
    });

    if (!res.ok) throw new Error(`Ollama responded with ${res.status}`);

    const data = await res.json() as { message?: { content: string } };
    const text = data.message?.content ?? "";
    return NextResponse.json({ response: text });
  } catch (err) {
    const isConnRefused = err instanceof Error && err.message.includes("ECONNREFUSED");
    return NextResponse.json(
      { error: isConnRefused ? "Serverul AI nu rulează. Pornește Ollama cu: ollama serve" : "Serviciul AI nu este disponibil momentan." },
      { status: 503 }
    );
  }
}
