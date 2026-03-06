// --- CONFIGURATION ---
const RENDER_URL = "https://botbay-python-services-latest.onrender.com";
const SUPABASE_URL = "URL HERE";
const SUPABASE_KEY = "KEY HERE";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Helper function to handle the authenticated fetch to Flask
 */
async function flaskRequest(endpoint, method = "GET", body = null) {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        console.error("User is not logged in");
        return { error: "No session found" };
    }

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${RENDER_URL}${endpoint}`, options);
    return await response.json();
}

/// ~~~ PARTS RELATED ~~~ ///

async function overwritePart(group, part) {
    return await flaskRequest(
        `/database/${group}/parts/${part.id}`,
        "PUT",
        part,
    );
}

async function createPart(group, part) {
    return await flaskRequest(`/database/${group}/parts`, "POST", part);
}

async function deletePart(group, partId) {
    return await flaskRequest(`/database/${group}/parts/${partId}`, "DELETE");
}

async function readAllParts(group) {
    return await flaskRequest(`/database/${group}/parts`, "GET");
}

async function readPart(group, partId) {
    return await flaskRequest(`/database/${group}/parts/${partId}`, "GET");
}

/// ~~~ BATTERY RELATED ~~~ ///

async function deleteBattery(group, batteryId) {
    return await flaskRequest(
        `/database/${group}/batteries/${batteryId}`,
        "DELETE",
    );
}

async function createBattery(group, battery) {
    return await flaskRequest(`/database/${group}/batteries`, "POST", battery);
}

async function readAllBatteries(group) {
    return await flaskRequest(`/database/${group}/batteries`, "GET");
}

/// ~~~ TAGS RELATED ~~~ ///

async function deleteTag(group, tagId) {
    return await flaskRequest(`/database/${group}/tags/${tagId}`, "DELETE");
}

async function createTag(group, tag) {
    return await flaskRequest(`/database/${group}/tags`, "POST", tag);
}

async function readAllTags(group) {
    return await flaskRequest(`/database/${group}/tags`, "GET");
}
