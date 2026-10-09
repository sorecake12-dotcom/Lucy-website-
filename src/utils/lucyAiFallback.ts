import { processLucyQuery, ChatTurn } from "./lucyAiEngine";

export function getOfflineLucyResponse(rawInput: string, history: ChatTurn[] = []): string {
  const result = processLucyQuery(rawInput, history);
  return result.reply;
}

export { processLucyQuery };
