import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HRProvider } from "./context/HRContext";
import { AppLayout } from "./components/layout/AppLayout";

// Modules
import { OverviewPage } from "./pages/OverviewPage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { RecruitmentPage } from "./pages/RecruitmentPage";
import { HRSupportPage } from "./pages/HRSupportPage";
import { AttendanceLeavePage } from "./pages/AttendanceLeavePage";
import { PerformancePage } from "./pages/PerformancePage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <HRProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route path="support" element={<HRSupportPage />} />
            <Route path="attendance" element={<AttendanceLeavePage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HRProvider>
  );
}

export default App;
