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
    useEffect(() => {
        const handleReloadAuth = async () => {
            // Get navigation entries to see HOW the page was loaded
            const perfEntries = performance.getEntriesByType("navigation");

            if (perfEntries.length > 0 && perfEntries[0].type === "reload") {
                console.log("Reload detected: Clearing session...");

                // 1. Sign out from Supabase
                await supabase.auth.signOut();

                // 2. Wipe session storage just to be safe
                window.sessionStorage.clear();

                // 3. Force redirect to landing or sign-in
                window.location.hash = "#/";
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
