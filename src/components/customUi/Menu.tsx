import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
    createContext,
    useContext,
    useState,
    type MouseEvent,
    type ReactNode,
} from "react";
import { MobileMenuContent, MobileMenuTrigger } from "./MobileMenu";
import { ModalContent, ModalTrigger } from "./Modal";

type MenuContextProps = {
    isOpen: boolean;
    position: { x: number; y: number };
    toggleMenu: (e: MouseEvent<HTMLElement>, id: string) => void;
    closeMenu: () => void;
};

const MenuType = {
    MOBILE_MENU: "menu",
    MODAL: "modal",
} as const;

type MenuType = (typeof MenuType)[keyof typeof MenuType];

export const sharedStyles = `fixed z-50 bg-black rounded-lg shadow-lg border border-gray-500 min-w-48 py-2`;

const MobileMenuContext = createContext<MenuContextProps | null>(null);

const MenuModal = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useOutsideClick(closeMenu, false);

    const toggleMenu = (e: MouseEvent<HTMLElement>, id: string) => {
        // for mobile menu
        if (!isOpen && e && id === MenuType.MOBILE_MENU) {
            const rect = (e.target as HTMLElement)
                .closest("button")
                ?.getBoundingClientRect();

            if (!rect) return;

            setPosition({
                x: window.innerWidth - rect.width - rect.x,
                y: rect.y + rect.height + 8,
            });
        }

        // for modal
        if (!isOpen && e && id === MenuType.MODAL) {
            setPosition({
                x: 50,
                y: 50,
            });
        }

        setIsOpen(!isOpen);
    };

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <MobileMenuContext.Provider
            value={{ isOpen, position, toggleMenu, closeMenu }}>
            <div ref={ref}>{children}</div>
        </MobileMenuContext.Provider>
    );
};

export function useMenuModalContext() {
    const context = useContext(MobileMenuContext);
    if (!context) {
        throw new Error("MenuModalContext must be used within a MenuModal");
    }
    return context;
}

MenuModal.MenuTrigger = MobileMenuTrigger;
MenuModal.ModalTrigger = ModalTrigger;
MenuModal.ModalContent = ModalContent;
MenuModal.MobileMenuContent = MobileMenuContent;

export default MenuModal;
