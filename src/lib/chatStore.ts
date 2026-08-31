import { useSyncExternalStore } from "react";
import type { AskAnswer } from "./mockData";
import { askProSafe, aiDelay } from "./aiSimulator";

export interface ChatTurn {
  id: string;
  question: string;
  status: "thinking" | "done";
  answer?: AskAnswer;
}

interface ChatState {
  isOpen: boolean;
  turns: ChatTurn[];
}

let state: ChatState = { isOpen: false, turns: [] };
const listeners = new Set<() => void>();

function setState(next: Partial<ChatState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

export function openChat() {
  setState({ isOpen: true });
}

export function closeChat() {
  setState({ isOpen: false });
}

export async function askChat(question: string) {
  const id = `turn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  setState({ turns: [...state.turns, { id, question, status: "thinking" }] });
  await aiDelay(1100);
  const answer = askProSafe(question);
  setState({
    turns: state.turns.map((t) => (t.id === id ? { ...t, status: "done", answer } : t)),
  });
}

export function resetChat() {
  setState({ turns: [] });
}

export function useChatStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
