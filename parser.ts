import { InboundMessage } from "./types";

export const parse = (payload: string | undefined): string | undefined => {
  if (!payload) {
    return undefined;
  }

  const parsedPayload: InboundMessage = JSON.parse(payload);
  const matches = parsedPayload.text.match(/(^https.*)\n/);
  if (!matches) {
    throw new Error("URL not found");
  }
  return matches[1];
};
