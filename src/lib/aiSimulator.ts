import { ASK_ANSWERS, type AskAnswer } from "./mockData";

export const aiDelay = (ms = 1200) => new Promise((r) => setTimeout(r, ms));

export function askIosp(question: string): AskAnswer {
  const q = question.toLowerCase();
  const scored = ASK_ANSWERS.map((a) => {
    const words = a.q.toLowerCase().split(/[^a-z0-9#]+/).filter((w) => w.length > 3);
    const hits = words.filter((w) => q.includes(w)).length;
    return { a, hits };
  }).sort((x, y) => y.hits - x.hits);

  if (scored[0] && scored[0].hits >= 2) return scored[0].a;

  return {
    q: question,
    answer:
      "I don't have grounded evidence for that question in the connected demo sources. Rather than guess, this query is queued for human review. Try one of the suggested questions to see a fully cited answer.",
    confidence: "Low",
    citations: [{ system: "IOSP", ref: "no matching evidence", age: "just now" }],
    evidence: [
      { label: "Why no answer", value: "No source record in Omnisafe, SAP PM, EoSR or the STP register matched this query with sufficient confidence." },
    ],
  };
}
