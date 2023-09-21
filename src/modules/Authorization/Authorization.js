import secret from '../../secret.json'; // JSON file in the src directory with a single key

if (!secret["CLIENT_ID"]) {
    throw new Error("You need to create a JSON file in the src directory called secret.json and give it an object with a key called CLIENT_ID.");
}

const client_id = secret["CLIENT_ID"];
const redirect_uri = "http://localhost:3000/";

const scope = "user-read-private user-read-email";
const url = "https://accounts.spotify.com/authorize";
const state = crypto.randomUUID();

function buildRequestUrl() {
    let requestUrl = url + "?response_type=token";
    requestUrl += '&client_id=' + encodeURIComponent(client_id);
    requestUrl += '&scope=' + encodeURIComponent(scope);
    requestUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    requestUrl += '&state=' + encodeURIComponent(state);

    return requestUrl;
}

function formatParamsAsObject(origin, href) {
    let params = href.replace(origin, '');
    const charsRegex = /(&|#|\?)/g;
    const result = {};

    while (params.length > 0) {
    const paramCharIndex = params.search(charsRegex);

    // If there is absolutely no reserved character then return the result as a guard against invalid strings
    if (paramCharIndex === -1) return result;

    // Filter everything between the reserved character and the next one
    let paramString = "";
    for (let i = paramCharIndex + 1; i < params.length; i++) {
        if (charsRegex.test(params[i])) {
            break;
        }

        paramString += params[i];
    }

    // Pair is expected to separate the string into a pair where pair[0] is the key.
    const pair = paramString.split("=");

    result[pair[0]] = pair[1];

    // Delete the entire key/value pair including the equals sign from the string
    params = params.replace(`${params.charAt(paramCharIndex)}${paramString}`, '');
    }

    return result;
}

export { buildRequestUrl, formatParamsAsObject };