import React, { useState, useEffect } from "react";
import {
    updateAccount,
    groupAction,
    verifyCurrentPassword,
    fetchGroupData,
} from "../../../scripts/auth.js";
import {
    MdOutlineEmail,
    MdLockOutline,
    MdExitToApp,
    MdDeleteForever,
    MdLock,
} from "react-icons/md";

import "../../../styles/dashboard.css";

function SettingsPageDesktop() {
    const [isPhone, setIsPhone] = useState(window.innerWidth < 1200);
    const [isVerified, setIsVerified] = useState(false);
    const [verifyPass, setVerifyPass] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Group state fetched after verification
    const [groupState, setGroupState] = useState({
        groupId: null,
        isAdmin: false,
    });

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth < 1200);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleVerify = async () => {
        if (!verifyPass) return;
        setLoading(true);
        try {
            // 1. Verify Password
            await verifyCurrentPassword(verifyPass);

            // 2. Fetch Group Data using your master fetch
            const res = await fetchGroupData();
            if (res.success) {
                setGroupState({
                    groupId: res.groupId,
                    isAdmin: res.isAdmin,
                });
                setIsVerified(true);
            } else {
                alert(
                    "Auth success, but failed to load group data: " + res.error,
                );
            }
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        if (!email) return;
        try {
            await updateAccount({ email });
            alert("Confirmation email sent to both addresses.");
        } catch (e) {
            alert(e.message);
        }
    };

    const handleUpdatePassword = async () => {
        if (!password) return;
        try {
            await updateAccount({ password });
            alert("Password updated!");
        } catch (e) {
            alert(e.message);
        }
    };

    const handleGroupAction = async (action) => {
        const confirmMsg =
            action === "delete"
                ? "PERMANENTLY DELETE entire group? This cannot be undone."
                : "Leave this group?";

        if (window.confirm(confirmMsg)) {
            try {
                await groupAction(groupState.groupId, action);
                window.location.hash = "#/group-selection";
            } catch (e) {
                alert(e.message);
            }
        }
    };

    // --- Identity Verification Screen (Phone Aware) ---
    if (!isVerified) {
        return (
            <div
                className="d-settings-wrapper"
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "60vh",
                }}
            >
                <div
                    className="d-settings-section"
                    style={{
                        width: "100%",
                        maxWidth: isPhone ? "95%" : "500px",
                        textAlign: "center",
                        border: "1px solid #44327a",
                    }}
                >
                    <MdLock
                        size={isPhone ? "10rem" : "3.5rem"}
                        color="#44327a"
                        style={{ marginBottom: "20px" }}
                    />
                    <h2
                        style={{
                            fontSize: isPhone ? "6rem" : "2.2rem",
                            marginBottom: "15px",
                        }}
                    >
                        Confirm Identity
                    </h2>
                    <p
                        style={{
                            fontSize: isPhone ? "3rem" : "1.1rem",
                            color: "#94a3b8",
                            marginBottom: "30px",
                        }}
                    >
                        Enter your current password to unlock sensitive
                        settings.
                    </p>
                    <input
                        className="d-settings-input"
                        type="password"
                        placeholder="Current Password"
                        value={verifyPass}
                        onChange={(e) => setVerifyPass(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    />
                    <button
                        className="d-settings-btn-primary"
                        onClick={handleVerify}
                        style={{ marginTop: isPhone ? "40px" : "20px" }}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Unlock Settings"}
                    </button>
                </div>
            </div>
        );
    }

    // --- Main Settings UI ---
    return (
        <div className="d-settings-wrapper">
            <h2
                style={{
                    fontSize: isPhone ? "6rem" : "2.5rem",
                    marginBottom: isPhone ? "40px" : "20px",
                    color: "#fff",
                }}
            >
                Account & Group
            </h2>

            {/* Email Section */}
            <div className="d-settings-section">
                <label className="d-settings-label">
                    <MdOutlineEmail /> Update Email
                </label>
                <input
                    className="d-settings-input"
                    type="email"
                    placeholder="New Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="d-settings-btn-primary"
                    onClick={handleUpdateEmail}
                >
                    Update Email
                </button>
            </div>

            {/* Password Section */}
            <div className="d-settings-section">
                <label className="d-settings-label">
                    <MdLockOutline /> Update Password
                </label>
                <input
                    className="d-settings-input"
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="d-settings-btn-primary"
                    onClick={handleUpdatePassword}
                >
                    Update Password
                </button>
            </div>

            {/* Danger Zone */}
            <div className="d-settings-danger-zone">
                <label
                    className="d-settings-label"
                    style={{ color: "#ff4d4d" }}
                >
                    Danger Zone
                </label>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: isPhone ? "30px" : "15px",
                        marginTop: "20px",
                    }}
                >
                    <button
                        className="d-settings-btn-danger"
                        onClick={() => handleGroupAction("leave")}
                    >
                        <MdExitToApp /> Leave Group
                    </button>

                    <hr style={{ color: "red", width: "100%" }}></hr>

                    {groupState.isAdmin && (
                        <button
                            className="d-settings-btn-danger"
                            style={{
                                backgroundColor: "rgba(255, 77, 77, 0.1)",
                            }}
                            onClick={() => handleGroupAction("delete")}
                        >
                            <MdDeleteForever /> Delete Group Entirely
                        </button>
                    )}

                    <button
                        className="d-settings-btn-danger"
                        style={{
                            borderStyle: "dashed",
                            marginTop: isPhone ? "30px" : "10px",
                        }}
                        onClick={() => {
                            if (
                                window.confirm(
                                    "DELETE ACCOUNT? This is permanent.",
                                )
                            ) {
                                alert("Account deletion request logged.");
                            }
                        }}
                    >
                        <MdDeleteForever /> Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPageDesktop;
