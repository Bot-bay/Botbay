import { createClient } from "@supabase/supabase-js";

// --- CONFIGURATION ---
const SUPABASE_URL = "https://qskjhirfbfxoiclrdkfh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7O6fxNAuQqS6Hea4KjH3cw_acm8Euey";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- AUTH FUNCTIONS (CLIENT-SIDE) ---

/**
 * CREATE NEW USER
 * Redirects after email confirmation.
 */
export const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // We removed the 'data' metadata object entirely
            emailRedirectTo: "http://localhost:5173/#/signup",
        },
    });
    return { data, error };
};

/**
 * SIGN IN
 * Manually redirects to the dashboard hash route upon success.
 */
export const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { data, error };
};

/**
 * CHANGE PASSWORD
 */
export const changePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });
    return { data, error };
};

export const getCurrentUser = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
};

// --- REMAINING FUNCTIONS (TO BE IMPLEMENTED) ---

// FORGOT PASSWORD
// DELETE USER (Requires Edge Function / Admin API)
// LEAVE GROUP
// DELETE GROUP
// INVITE USER TO GROUP

export const joinGroup = async (groupId) => {
    // logic for joining a group
    // e.g., updating a 'groups' table or user metadata
};

export const createGroup = async () => {
    // logic for generating a new group ID
    // and assigning the current user to it
};

export const getUserGroup = async (userId) => {
    // logic to fetch the user's group
};
