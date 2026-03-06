import React, { useState } from "react";
import { Users, PlusCircle, Loader2 } from "lucide-react";
import { joinGroup, createGroup } from "../scripts/auth.js";

function GroupSelection({ isPhone }) {
    const [groupId, setGroupId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleJoin = async () => {
        if (!groupId) return setLocalError("Enter a Group ID");
        setLocalError("");
        setIsLoading(true);
        await joinGroup(groupId);
        setIsLoading(false);
    };

    const handleCreate = async () => {
        setLocalError("");
        setIsLoading(true);
        await createGroup();
        setIsLoading(false);
    };

    return (
        <div
            className="inputcontainer"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: isPhone ? "50px" : "30px",
                width: "100%",
                alignItems: "center",
            }}
        >
            <h2
                style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: isPhone ? "5rem" : "1.8rem",
                    margin: "0 0 10px 0",
                }}
            >
                Welcome!
            </h2>

            {localError && (
                <p
                    style={{
                        color: "red",
                        fontSize: isPhone ? "3rem" : "1rem",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    {localError}
                </p>
            )}

            {/* JOIN GROUP SECTION */}
            <div
                style={{
                    border: "1px solid #333",
                    padding: isPhone ? "50px" : "20px",
                    borderRadius: "15px",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <p
                    className="inputheader"
                    style={{
                        fontSize: isPhone ? "3rem" : "",
                        width: "100%",
                        textAlign: isPhone ? "center" : "left",
                        marginBottom: isPhone ? "20px" : "10px",
                    }}
                >
                    Join a Group:
                </p>
                <input
                    className="signupinput"
                    style={{
                        fontSize: isPhone ? "3rem" : "",
                        marginBottom: isPhone ? "40px" : "10px",
                        width: "100%",
                        height: isPhone ? "12rem" : "auto", // Increased height
                        textAlign: "center",
                        borderRadius: isPhone ? "15px" : "5px",
                    }}
                    placeholder="Enter Group ID"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                />
                <button
                    className="signupbutton"
                    onClick={handleJoin}
                    disabled={isLoading}
                    style={{
                        fontSize: isPhone ? "3rem" : "",
                        background: "#222",
                        width: "100%",
                        minHeight: isPhone ? "12rem" : "auto", // Extra tall for big text
                        padding: isPhone ? "2px 0" : "10px 20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Users
                        size={isPhone ? 20 : 20}
                        style={{ marginRight: "15px" }}
                    />
                    Join
                </button>
            </div>

            <p
                style={{
                    color: "#888",
                    textAlign: "center",
                    fontSize: isPhone ? "3rem" : "1rem",
                    margin: "15px 0",
                }}
            >
                — OR —
            </p>

            {/* CREATE GROUP SECTION */}
            <button
                className="signupbutton"
                onClick={handleCreate}
                disabled={isLoading}
                style={{
                    fontSize: isPhone ? "3rem" : "",
                    background: "#4b5563", // Slightly different color to distinguish from Join, or keep same as Join if preferred
                    width: "100%",
                    minHeight: isPhone ? "12rem" : "auto",
                    padding: isPhone ? "2px 0" : "10px 20px", // Matched Join button padding logic
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: isPhone ? "15px" : "5px",
                }}
            >
                {isLoading ? (
                    <Loader2
                        className="animate-spin"
                        size={isPhone ? 70 : 25}
                    />
                ) : (
                    <>
                        <PlusCircle
                            size={isPhone ? 20 : 20} // Scaled icon for phone
                            style={{ marginRight: "15px" }}
                        />
                        Create New Group
                    </>
                )}
            </button>
        </div>
    );
}

export default GroupSelection;
