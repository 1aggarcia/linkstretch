const devMode = false;

const domain = devMode? "http://127.0.0.1:5000" : "https://linkstretch.vercel.app"

const createEndpoint = "/links/create";
const countEndpoint = "/links/count";

// TODO: error handling
export async function getCountAsync() {
    const url = `${domain}${countEndpoint}`
    const response = await fetch(url);
    const jsonResponse = await response.json();

    return jsonResponse.count;
}

// TODO: error handling
export async function createLinkAsync(shortlink) {
    const url = `${domain}${createEndpoint}`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({shortlink: shortlink})
    })
    const jsonResponse = await response.json();

    return jsonResponse.url;
}
