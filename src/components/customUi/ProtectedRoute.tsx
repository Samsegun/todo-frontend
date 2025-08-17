import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";

function ProtectedRoute() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h2>
                    <LoaderCircle size={48} className='animate-spin' />
                </h2>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div>
            <header className='bg-black'>
                <div className='maximum-w p-4 flex justify-between items-center'>
                    <h1 className='text-xl'>Todo App</h1>

                    <Navbar />
                </div>
            </header>

            <Outlet />
        </div>
    );
}

export default ProtectedRoute;
