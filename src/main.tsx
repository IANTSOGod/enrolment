import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import "./index.css";
import Login from "./pages/Login";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Enrolment from "./pages/Enrolment";
import History from "./pages/History";
import Settings from "./pages/Settings";
import SyncQueue from "./pages/SyncQueue";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: ReactNode }) {
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token:", accessToken); // Debugging line

  return accessToken ? children : <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route
            path="/admin"
            element={
                <DashboardLayout />
            }
          >
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              } />

            <Route path="/admin/enrolment" element={
              <ProtectedRoute>
                <Enrolment />
              </ProtectedRoute>
            } />

            <Route path="/admin/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />

            <Route path="/admin/sync" element={
              <ProtectedRoute>
                <SyncQueue />
              </ProtectedRoute>
            } />

            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>,
);
