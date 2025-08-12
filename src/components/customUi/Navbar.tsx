import { Menu } from "lucide-react";
import MenuModal from "./Menu";

function Navbar() {
    return (
        <nav>
            {/* desktop nav */}
            <ul className='hidden gap-3 items-center md:flex'>
                <li>Home</li>
                <li>Dashboard</li>
            </ul>

            {/* mobile nav */}
            <MenuModal>
                <MenuModal.MenuTrigger>
                    <Menu />
                </MenuModal.MenuTrigger>

                <MenuModal.MobileMenuContent>
                    <ul>
                        <li>Home</li>
                        <li>Dashboard</li>
                    </ul>
                </MenuModal.MobileMenuContent>
            </MenuModal>
        </nav>
    );
}

export default Navbar;
