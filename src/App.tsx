import { Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./components/customUi/AuthLayout";
import ProtectedRoute from "./components/customUi/ProtectedRoute";
import Dashboard from "./pages/DAshboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path='dashboard' element={<Dashboard />} />
            </Route>

            <Route element={<AuthLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
