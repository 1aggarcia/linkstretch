const DEV_MODE = false;

const DOMAIN = DEV_MODE
  ? "http://127.0.0.1:5000"
  : "https://linkstretch.vercel.app";

const CREATE_ENDPOINT = "/links/create";
const COUNT_ENDPOINT = "/links/count";

export const shortlinkKey = "shortlink";

// TODO: error handling
export async function getCountAsync() {
  const url = `${DOMAIN}${COUNT_ENDPOINT}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Status: ${response.status}, ${await response.text()}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.count;

  } catch (error) {
    throw error;
  }
}

// TODO: error handling
export async function createLinkAsync(shortlink: string): Promise<string> {
  const requestUrl = `${DOMAIN}${CREATE_ENDPOINT}`;

  try {
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shortlink: shortlink }),
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}, ${await response.text()}`);
    }

    const jsonResponse = await response.json();
    
    if (typeof jsonResponse !== "object"
        || typeof jsonResponse.url !== "string") {
      throw new TypeError("500: Server response incorrectly formatted");
    }
  
    return jsonResponse.url;

  } catch (error) {
    throw error;
  }
}
