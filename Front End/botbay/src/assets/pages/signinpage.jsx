import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import signUpLogo from "../images/LogoTrans.png";
import { switchToPage } from "../scripts/navigation.js";
import { signInUser, getUserGroup } from "../scripts/auth.js";
import GroupSelection from "./groupsection.jsx";

import "../styles/signupstyles.css";
import "../styles/sharedstyles.css";

function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 1199);

    // Toggle between 'form' and 'group-menu'
    const [view, setView] = useState("form");

    const goToSignUp = switchToPage("/signup");
    const goToForgot = switchToPage("/forgotpassword");

    useEffect(() => {
        const handleResize = () => setIsPhone(window.innerWidth <= 1199);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setErrorMessage("");
        setIsLoading(true);

        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        const { data, error } = await signInUser(email, password);

        if (error) {
            setErrorMessage(
                error.message === "Invalid login credentials"
                    ? "Incorrect email or password."
                    : error.message,
            );
            setIsLoading(false);
        } else {
            // SUCCESSFUL LOGIN: Now check for group
            try {
                const { group } = await getUserGroup(data.user.id);

                if (group) {
                    // User has a group, navigation is usually handled by auth listener
                    // or you can call it here:
                    window.location.href = "/dashboard";
                } else {
                    // No group found, show the selection component
                    setView("group-menu");
                }
            } catch (err) {
                console.error("Group fetch error:", err);
                setView("group-menu"); // Fallback to selection
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div
            className="screencontainer"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <div className="centercontainer-signup">
                <div className="contentcontainer">
                    <div className="logocontainer">
                        <img
                            className="signuplogo"
                            src={signUpLogo}
                            alt="Logo"
                        />
                        <p className="signupheader">Botbay</p>
                    </div>

                    {/* Conditional Rendering based on View */}
                    {view === "form" ? (
                        <>
                            {errorMessage && (
                                <p
                                    style={{
                                        color: "red",
                                        textAlign: "center",
                                        fontSize: isPhone ? "4rem" : "1rem",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {errorMessage}
                                </p>
                            )}

                            <div className="inputcontainer">
                                <p
                                    className="inputheader"
                                    style={{ fontSize: isPhone ? "4rem" : "" }}
                                >
                                    Email:
                                </p>
                                <input
                                    className="signupinput"
                                    style={{
                                        borderColor: errorMessage ? "red" : "",
                                        fontSize: isPhone ? "4rem" : "",
                                    }}
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <p
                                    className="inputheader"
                                    style={{ fontSize: isPhone ? "4rem" : "" }}
                                >
                                    Password:
                                </p>
                                <div className="password-wrapper">
                                    <input
                                        className="passwordinput"
                                        style={{
                                            borderColor: errorMessage
                                                ? "red"
                                                : "",
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="eye-button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={{
                                            width: isPhone ? "4rem" : "auto",
                                        }}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={isPhone ? 48 : 22} />
                                        ) : (
                                            <Eye size={isPhone ? 48 : 22} />
                                        )}
                                    </button>
                                </div>

                                <div className="bottomcontainer">
                                    <p
                                        className="bottomtext"
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                    >
                                        Forgot your password?{" "}
                                        <span
                                            className="forgotpasswordspan"
                                            onClick={goToForgot}
                                        >
                                            Click here
                                        </span>
                                    </p>
                                    <p
                                        className="bottomtext"
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                        }}
                                    >
                                        Don't have an account yet?{" "}
                                        <span
                                            className="forgotpasswordspan"
                                            onClick={goToSignUp}
                                        >
                                            Click here
                                        </span>
                                    </p>
                                </div>

                                <div className="bottomcontainer">
                                    <button
                                        className="signupbutton"
                                        onClick={handleSignIn}
                                        disabled={isLoading}
                                        style={{
                                            fontSize: isPhone ? "4rem" : "",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2
                                                    className="animate-spin"
                                                    size={isPhone ? 48 : 20}
                                                />
                                                Logging in...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Use the standalone component */
                        <GroupSelection isPhone={isPhone} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
