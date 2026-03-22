const RENDER_URL = "https://botbay-python-services-latest.onrender.com";

import { supabase } from "./auth.js";
import { getUserGroup } from "./auth.js";

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

    if (!response.ok)
        throw new Error(result.error || result.message || "Request failed");
    return result;
}

/// ~~~ PARTS RELATED ~~~ ///

export async function overwritePart(part) {
    const { group: teamId } = await getUserGroup();

    if (!teamId) {
        return { success: false, error: "No team context found" };
    }

    try {
        const result = await flaskRequest(
            `/database/${teamId}/parts/${part.id}/overwrite`,
            "POST",
            { updated_part_data: part },
        );

        return { success: true, data: result };
    } catch (err) {
        console.error("System error in overwritePart:", err);
        return { success: false, error: err.message };
    }
}

export async function overwriteQuant(partId, quant, needed) {
    const { group: teamId } = await getUserGroup();
    try {
        const result = await flaskRequest(
            `/database/${teamId}/parts/${partId}/quantities`,
            "POST",
            {
                new_quant: Number(quant),
                new_needed: Number(needed),
            },
        );

        if (result.success && result.data) {
            localStorage.setItem("partData", JSON.stringify(result.data));
            window.dispatchEvent(new Event("storage"));
        }
        return result;
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export const cloudCreatePart = async (itemData, teamId) => {
    try {
        const result = await flaskRequest(`/database/${teamId}/parts`, "POST", {
            item_data: itemData,
        });
        return result;
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export async function cloudDeletePart(id) {
    const signedIn = localStorage.getItem("is_logged_in") === "true";
    let success = false;

    if (signedIn) {
        const { group: teamId } = await getUserGroup();
        try {
            const result = await flaskRequest(
                `/database/${teamId}/parts/${id}`,
                "DELETE",
            );
            success = result.success;
        } catch (err) {
            console.error("Cloud delete failed:", err);
        }
    }

    const rawData = localStorage.getItem("partData") || "[]";
    const data = JSON.parse(rawData);
    const updated = data.filter((p) => String(p.id) !== String(id));
    localStorage.setItem("partData", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));

    return success || !signedIn;
}

export async function readPart(partId) {
    const { group: teamId } = await getUserGroup();
    try {
        const result = await flaskRequest(
            `/database/${teamId}/parts/${partId}`,
            "GET",
        );
        return result.data;
    } catch (err) {
        return null;
    }
}

/// ~~~ BATTERY RELATED ~~~ ///

export async function deleteBattery(nameToDelete) {
    const { group: teamId } = await getUserGroup();
    try {
        return await flaskRequest(
            `/database/${teamId}/batteries/${nameToDelete}`,
            "DELETE",
        );
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function createBattery(battery) {
    const { group: teamId } = await getUserGroup();
    try {
        return await flaskRequest(`/database/${teamId}/batteries`, "POST", {
            battery,
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function updateBatteryStatusCloud(updatedBattery) {
    const { group: teamId } = await getUserGroup();
    try {
        return await flaskRequest(
            `/database/${teamId}/batteries/update`,
            "POST",
            { updatedBattery },
        );
    } catch (err) {
        return { success: false, error: err.message };
    }
}

/// ~~~ TAGS RELATED ~~~ ///

export async function deleteTagCloud(tagName) {
    const { group: teamId } = await getUserGroup();
    try {
        return await flaskRequest(
            `/database/${teamId}/tags/${tagName}`,
            "DELETE",
        );
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function createTag(tag) {
    const { group: teamId } = await getUserGroup();
    try {
        return await flaskRequest(`/database/${teamId}/tags`, "POST", { tag });
    } catch (err) {
        return { success: false, error: err.message };
    }
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
