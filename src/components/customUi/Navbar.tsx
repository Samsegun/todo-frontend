import { Menu } from "lucide-react";
import { NavLink } from "react-router";
import MenuModal from "./Menu";

const navItems = ["/", "dashboard"];

function Navbar() {
    return (
        <nav>
            {/* desktop nav */}
            <ul className='hidden gap-3 items-center md:flex'>
                {navItems.map(link => {
                    return (
                        <li key={link}>
                            <NavLink
                                to={link === "/" ? link : `/${link}`}
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "text-[#32bc9b]"
                                            : "text-white"
                                    } capitalize hover:text-[#32bc9c7b]`
                                }>
                                {link === "/" ? "home" : link}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            {/* mobile nav */}
            <MenuModal>
                <MenuModal.MenuTrigger>
                    <Menu />
                </MenuModal.MenuTrigger>

                <MenuModal.MobileMenuContent>
                    <ul className='items-start px-4 py-2 space-y-8 text-xl'>
                        {navItems.map(link => {
                            return (
                                <li key={link}>
                                    <NavLink
                                        to={link === "/" ? link : `/${link}`}
                                        className={({ isActive }) =>
                                            `${
                                                isActive
                                                    ? "text-[#32bc9b]"
                                                    : "text-white"
                                            } capitalize hover:text-[#32bc9c7b]`
                                        }>
                                        {link === "/" ? "home" : link}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </MenuModal.MobileMenuContent>
            </MenuModal>
        </nav>
    );
}

export default Navbar;
