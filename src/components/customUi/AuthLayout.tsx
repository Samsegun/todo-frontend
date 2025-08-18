import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";

function AuthLayout() {
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

    return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
}

export default AuthLayout;
