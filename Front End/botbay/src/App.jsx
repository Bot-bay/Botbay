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
        // 1. Identification
        const tabActive = sessionStorage.getItem("tab_session_active");
        const perfEntries = performance.getEntriesByType("navigation");
        const isReload =
            perfEntries.length > 0 && perfEntries[0].type === "reload";

        // 2. Check for active Supabase session
        const sessionKey = Object.keys(localStorage).find((key) =>
            key.includes("-auth-token"),
        );
        const isUserLoggedIn = sessionKey && !!localStorage.getItem(sessionKey);

        // 3. THE FIX: Only enter the "Clear" zone if the user is authenticated.
        // Guests (not signed in) will skip this entire block, preserving their data.
        if (isUserLoggedIn) {
            if (!tabActive || isReload) {
                console.log(
                    isReload ? "Auth Reload" : "New Auth Session",
                    " - Clearing secure data...",
                );

                // Specific removal only
                localStorage.removeItem("partData");
                localStorage.removeItem("tagslist");
                localStorage.removeItem("batteryList");

                if (isReload) {
                    // Kill the session manually to prevent auto-login
                    localStorage.removeItem(sessionKey);
                    sessionStorage.clear();
                    window.location.hash = "#/";
                }
            }
        }

        // 4. Always mark tab as active so guests can refresh/navigate safely
        sessionStorage.setItem("tab_session_active", "true");
    })();

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
