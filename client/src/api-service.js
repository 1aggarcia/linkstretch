const devMode = false;

const domain = devMode
  ? "http://127.0.0.1:5000"
  : "https://linkstretch.vercel.app";

const createEndpoint = "/links/create";
const countEndpoint = "/links/count";

export const shortlinkKey = "shortlink";

// TODO: error handling
export async function getCountAsync() {
  const url = `${domain}${countEndpoint}`;

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
export async function createLinkAsync(shortlink) {
  const url = `${domain}${createEndpoint}`;

  try {
    const response = await fetch(url, {
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
    return jsonResponse.url;

  } catch (error) {
    throw error;
  }
}
