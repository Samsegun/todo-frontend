import { Outlet } from "react-router";
import Navbar from "./Navbar";

function ProtectedRoute() {
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
