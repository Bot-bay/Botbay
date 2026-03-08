// --- CONFIGURATION ---
const RENDER_URL = "https://botbay-python-services-latest.onrender.com";

import { supabase } from "./auth.js";

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

    if (method !== "GET" && body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${RENDER_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Request failed");
    return result;
}

/// ~~~ PARTS RELATED ~~~ ///

async function overwritePart(group, part) {
    return await flaskRequest(
        `/database/${group}/parts/${part.id}`,
        "PUT",
        part,
    );
}

export const cloudCreatePart = async (itemData, teamId) => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase.rpc("create_new_part_cloud", {
            item_data: itemData,
            target_team_id: teamId,
            requestor_id: user.id,
        });

        if (error) throw error;
        return { success: true, item: data };
    } catch (error) {
        console.error("Cloud append failed:", error.message);
        return { success: false, error: error.message };
    }
};

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

/// ~~~ SYNC RELATED ~~~ ///

/**
 * Syncs all local storage data (Parts, Tags, Batteries) to the cloud group
 * in a single request to the Python backend.
 */
export async function syncLocalData(groupId, parts, tags, batteries) {
    return await flaskRequest(`/database/${groupId}/sync`, "POST", {
        parts: parts || [],
        tags: tags || [],
        batteries: batteries || [],
    });
}

export async function getCloudData(groupId) {
    return await flaskRequest(`/database/${groupId}/all-data`, "GET");
}
