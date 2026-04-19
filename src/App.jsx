// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import MaintenanceMode from "./components/common/MaintenanceMode/MaintenanceMode";
import TrackingScripts from "./components/common/TrackingScripts/TrackingScripts";
import PageTracker from "./components/common/PageTracker/PageTracker";

function App() {
    return (
        <HelmetProvider>
            <TrackingScripts />
            <MaintenanceMode>
                <BrowserRouter>
                    <AuthProvider>
                        <ScrollToTop />
                        <PageTracker />
                        <AppRoutes />
                    </AuthProvider>
                </BrowserRouter>
            </MaintenanceMode>
        </HelmetProvider>
    );
}

export default App;
