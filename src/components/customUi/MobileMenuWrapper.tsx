import { LogOut } from "lucide-react";
import { NavLink } from "react-router";
import MenuModal, { useMenuModalContext } from "./Menu";
import { navItems } from "./Navbar";
import StyledButton from "./StyledButton";

function MobileMenuWrapper({ onSignout }: { onSignout: () => void }) {
    const { closeMenu } = useMenuModalContext();

    return (
        <MenuModal.MobileMenuContent>
            <ul className='items-start px-4 py-2 space-y-8 text-xl'>
                {navItems.map(link => {
                    return (
                        <li key={link}>
                            <NavLink
                                to={link === "/" ? link : `/${link}`}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? "text-[#32bc9b]"
                                            : "text-white"
                                    } capitalize block`
                                }>
                                {link === "/" ? "home" : link}
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
        </MenuModal.MobileMenuContent>
    );
}

export default MobileMenuWrapper;
