const DEV_MODE = false;

const DOMAIN = DEV_MODE
  ? "http://localhost:3000"
  : "https://linkstretch.vercel.app";

const CREATE_ENDPOINT = "/links/create";
const COUNT_ENDPOINT = "/links/count";

export const shortlinkKey = "shortlink";

/**
 * Get the link count from the server
 * @returns Promise resolving to the count,
 *  or rejecting if failure to get a response
 */
export async function getCountAsync(): Promise<number> {
  const response = await fetch(`${DOMAIN}${COUNT_ENDPOINT}`);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}, ${await response.text()}`);
  }

  const json: unknown = await response.json();

  if (json === null || typeof json !== "object") {
    throw new TypeError("Server gave a response of the incorrect type");
  }
  if (!("count" in json) || typeof json.count !== "number") {
    throw new ReferenceError("Server response missing param 'count'");
  }

  return json.count;
}

/**
 * Send a short link to the server to lengthen
 * @returns Promise resolving to the long link,
 *  or rejecting if failure to get a response
 */
export async function createLinkAsync(shortlink: string): Promise<string> {
  const requestUrl = `${DOMAIN}${CREATE_ENDPOINT}`;
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shortlink: shortlink }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const json: unknown = await response.json();

  if (json === null || typeof json !== "object") {
    throw new TypeError("Server gave a response of the incorrect type");
  }
  if (!("url" in json) || typeof json.url !== "string") {
    throw new ReferenceError("Server response missing param 'url'");
  }

  return json.url;
}

