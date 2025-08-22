import { useSignout } from "@/hooks/useAuth";
import { LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router";
import MenuModal from "./Menu";
import MobileMenuWrapper from "./MobileMenuWrapper";
import StyledButton from "./StyledButton";

export const navItems = ["home", "dashboard"];

function Navbar() {
    const signoutMutation = useSignout();

    function onSignout() {
        signoutMutation.mutate();
    }

    return (
        <nav>
            {/* desktop nav */}
            <ul className='hidden gap-3 items-center md:flex'>
                {navItems.map(link => {
                    return (
                        <li key={link}>
                            <NavLink
                                to={`/${link}`}
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "text-[#32bc9b]"
                                            : "text-white"
                                    } capitalize hover:text-[#32bc9c7b]`
                                }>
                                {link}
                            </NavLink>
                        </li>
                    );
                })}
                <li>
                    <StyledButton
                        variant={"destructive"}
                        className='gap-2'
                        onClick={onSignout}>
                        <span>Sign out</span>
                        <LogOut size={18} />
                    </StyledButton>
                </li>
            </ul>

            {/* mobile nav */}
            <MenuModal>
                <MenuModal.MenuTrigger>
                    <Menu />
                </MenuModal.MenuTrigger>

                <MobileMenuWrapper onSignout={onSignout} />
            </MenuModal>
        </nav>
    );
}

export default Navbar;
