import { createClient } from "@supabase/supabase-js";

const RENDER_URL = "https://botbay-python-services-latest.onrender.com";
const SUPABASE_URL = "https://qskjhirfbfxoiclrdkfh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7O6fxNAuQqS6Hea4KjH3cw_acm8Euey";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
            Authorization: token, // Just the raw token string
        },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${RENDER_URL}${endpoint}`, options);
    return await response.json();
}

// --- AUTH & USER ---

export const signUpUser = async (email, password) => {
    return await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "http://localhost:5173/#/signup" },
    });
};

export const signInUser = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
};

export const getCurrentUser = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
};

// --- THE MASTER FETCH (RPC ONLY) ---

/**
 * Replaces fetchGroupMembersData.
 * Fetches members, admin status, and group ID in one secure RPC call.
 */
export const fetchGroupData = async () => {
    try {
        const { data, error } = await supabase.rpc("get_group_management_data");
        if (error) throw error;

        if (!data || data.success === false) {
            return { success: false, error: data?.error || "No data" };
        }

        return {
            success: true,
            members: data.members || [],
            isAdmin: data.is_admin,
            groupId: data.group_id,
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

// --- GROUP ACTIONS (RPC ONLY) ---

export const createGroup = async () => {
    const { data: teamId, error } = await supabase.rpc(
        "create_new_team_and_assign_user",
    );
    if (!error) window.location.hash = "#/dashboard";
    return { teamId, error };
};

export const joinGroup = async (groupId) => {
    const { error } = await supabase.rpc("join_existing_group", {
        target_group_id: parseInt(groupId, 10),
    });
    if (!error) window.location.hash = "#/dashboard";
    return { error };
};

export const leaveGroup = async () => {
    const { error } = await supabase.rpc("leave_current_group");
    if (!error) window.location.hash = "#/group-selection";
    return { error };
};

// --- ADMIN ACTIONS (RPC ONLY) ---

export const inviteUserByUUID = async (targetUuid, groupId) => {
    const { error } = await supabase.rpc("invite_user_to_group", {
        target_user_uuid: targetUuid,
        target_group_id: groupId,
    });
    return { success: !error, message: error ? error.message : "Invite Sent!" };
};

export const removeMember = async (userId, groupId) => {
    const { error } = await supabase.rpc("remove_user_from_group", {
        target_user_uuid: userId,
        target_group_id: groupId,
    });
    return {
        success: !error,
        message: error ? error.message : "Member removed.",
    };
};

export const saveAdminList = async (groupId, adminList) => {
    const { error } = await supabase.rpc("save_admin_list", {
        target_group_id: groupId,
        new_admin_array: adminList,
    });
    return {
        success: !error,
        message: error ? error.message : "Permissions updated!",
    };
};

/**
 * GET USER GROUP (RPC ONLY)
 * Efficiently checks if the user belongs to a group.
 */
export const getUserGroup = async () => {
    try {
        const { data, error } = await supabase.rpc("get_user_group_id");

        if (error) {
            console.error("RPC Fetch Failed:", error.message);
            return { group: null, error };
        }

        // Returns the group ID (int) or null
        const finalGroup = data && data !== 0 ? data : null;
        return { group: finalGroup, error: null };
    } catch (err) {
        return { group: null, error: err.message };
    }
};

// auth.js
export const fetchInvitedUsers = async (teamId) => {
    const { data, error } = await supabase.rpc("get_group_invites", {
        target_team_id: teamId,
    });

    if (error) {
        console.error("Error fetching invites:", error);
        return [];
    }
    return Array.isArray(data) ? data : [];
};

export const removeInvitedUser = async (teamId, uuidToRemove) => {
    const { data, error } = await supabase.rpc("handle_uninvite", {
        target_team_id: teamId,
        uuid_to_remove: uuidToRemove,
    });

    if (error) {
        console.error("Error removing invite:", error);
        return null;
    }
    return data;
};

export const updateAccount = async (data) => {
    // data can be { email: 'new@email.com' } or { password: 'newpassword' }
    const { error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return { success: true };
};

export const deleteUserAccount = async () => {};

export const groupAction = async (groupId, action) => {
    // We pass the endpoint, the method, and the data body.
    // flaskRequest handles the Token and the RENDER_URL automatically.
    const result = await flaskRequest("/database/group-action", "POST", {
        teamId: groupId,
        action: action,
    });

    if (result.error || !result.success) {
        throw new Error(result.error || "Group action failed");
    }

    return result.data;
};

/**
 * Force a password check to verify identity for sensitive actions
 */
export const verifyCurrentPassword = async (password) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
    });

    if (error) throw new Error("Verification failed: Incorrect password.");
    return true;
};
