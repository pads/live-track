import { describe, expect, it } from "vitest";
import { InboundMessage } from "./types";
import { parse } from "./parser";

describe("Parser", () => {
  it("returns the URL from the payload", () => {
    const payload: InboundMessage = {
      to: "441234567890",
      message_uuid: "123",
      timestamp: "2024-11-26T15:20:44Z",
      text: 'https://www.strava.com/beacon/WkaBDuoEtGN\n\n"You\'re a safety contact for my next activity. Watch me on Strava."\n-Ben Paddock (WLRCC)',
    };

    const url = parse(JSON.stringify(payload));

    expect(url).toBe("https://www.strava.com/beacon/WkaBDuoEtGN");
  });

  it("returns undefined given an undefined payload", () => {
    expect(parse(undefined)).toBeUndefined();
  });

  it("throws an error when the URL cannot be found", () => {
    const payload: InboundMessage = {
      to: "441234567890",
      message_uuid: "123",
      timestamp: "2024-11-26T15:20:44Z",
      text: '"You\'re a safety contact for my next activity. Watch me on Strava."\n-Ben Paddock (WLRCC)',
    };

    expect(() => parse(JSON.stringify(payload))).toThrowError("URL not found");
  });
});
