import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./components/customUi/AuthLayout";
import ProtectedRoute from "./components/customUi/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route index element={<Navigate to='home' />} />

                        <Route path='home' element={<Home />} />
                        <Route path='dashboard' element={<Dashboard />} />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path='login' element={<Login />} />
                        <Route path='signup' element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>

            <Toaster
                position='top-center'
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
