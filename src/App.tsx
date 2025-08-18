import { Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./components/customUi/AuthLayout";
import ProtectedRoute from "./components/customUi/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path='dashboard' element={<Dashboard />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
            </Route>
        </Routes>
    );
}

export default App;
