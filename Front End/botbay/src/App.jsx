import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./assets/scripts/auth.js";
import LandingPage from "./assets/pages/landingpage.jsx";
import SignUpPage from "./assets/pages/signuppage.jsx";
import SignInPage from "./assets/pages/signinpage.jsx";
import ForgotPasswordPage from "./assets/pages/forgotpasswordpage.jsx";
import Dashboard from "./assets/pages/dashboard.jsx";
import UpdatePasswordPage from "./assets/pages/updatepassword.jsx";

function App() {
    (function () {
        // 1. Check if this specific TAB has a session flag
        const tabActive = sessionStorage.getItem("tab_session_active");

        if (!tabActive) {
            // 2. If no flag exists, this is a brand new tab/window instance.
            // Wipe the specific data you want cleared.
            localStorage.removeItem("partData");
            localStorage.removeItem("tagslist");
            localStorage.removeItem("batteryList");

            // 3. Set the flag for this tab so it survives refreshes (F5)
            sessionStorage.setItem("tab_session_active", "true");
        }
    })();
    useEffect(() => {
        const handleReloadAuth = async () => {
            const perfEntries = performance.getEntriesByType("navigation");

            // 1. Detect the Reload
            if (perfEntries.length > 0 && perfEntries[0].type === "reload") {
                // 2. Identify the Supabase auth key in localStorage
                const sessionKey = Object.keys(localStorage).find((key) =>
                    key.includes("-auth-token"),
                );
                const isUserLoggedIn = !!localStorage.getItem(sessionKey);

                // 3. Only act if the user was actually signed in
                if (isUserLoggedIn) {
                    console.log(
                        "Authenticated reload: Clearing data and session...",
                    );

                    // Wipe specific dashboard data
                    localStorage.removeItem("partData");
                    localStorage.removeItem("tagslist");
                    localStorage.removeItem("batteryList");

                    // Sign out and redirect
                    await supabase.auth.signOut();
                    window.sessionStorage.clear();
                    window.location.hash = "#/";
                }
            }
        };

        handleReloadAuth();
    }, []);

    useEffect(() => {
        const handleTabClose = () => {
            const sessionKey = Object.keys(localStorage).find((key) =>
                key.includes("-auth-token"),
            );
            const isUserLoggedIn = !!localStorage.getItem(sessionKey);

            if (isUserLoggedIn) {
                localStorage.removeItem("partData");
                localStorage.removeItem("tagslist");
                localStorage.removeItem("batteryList");
            }
        };

        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPasswordPage />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/updatepassword"
                        element={<UpdatePasswordPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
