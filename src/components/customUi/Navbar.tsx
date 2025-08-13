import { Menu } from "lucide-react";
import MenuModal from "./Menu";

function Navbar() {
    return (
        <nav>
            {/* desktop nav */}
            <ul className='hidden gap-3 items-center md:flex'>
                <li>Home</li>
                <li>Dashboard</li>
                <li>Login</li>
            </ul>

            {/* mobile nav */}
            <MenuModal>
                <MenuModal.MenuTrigger>
                    <Menu />
                </MenuModal.MenuTrigger>

                <MenuModal.MobileMenuContent>
                    <ul className='items-start px-4 py-2 text-[#32bc9b] space-y-8 text-xl'>
                        <li>Home</li>
                        <li>Dashboard</li>
                        <li>Login</li>
                    </ul>
                </MenuModal.MobileMenuContent>
            </MenuModal>
        </nav>
    );
}

export default Navbar;
