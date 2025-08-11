import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
    createContext,
    useContext,
    useState,
    type MouseEvent,
    type ReactNode,
} from "react";

type MenuContextProps = {
    isOpen: boolean;
    position: { x: number; y: number };
    toggleMenu: (e: MouseEvent, id: string) => void;
    closeMenu: () => void;
};

const MenuType = {
    MOBILE_MENU: "menu",
    MODAL: "modal",
} as const;

type MenuType = (typeof MenuType)[keyof typeof MenuType];

const sharedStyles = `fixed z-50 bg-white text-black rounded-lg shadow-lg border min-w-48 py-2`;

const MobileMenuContext = createContext<MenuContextProps | null>(null);

const MenuModal = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useOutsideClick(closeMenu, false);

    const toggleMenu = (e: MouseEvent, id: string) => {
        // for mobile menu
        if (!isOpen && e && id === MenuType.MOBILE_MENU) {
            console.log("menu");

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
            console.log("modal");
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

const MobileMenuTrigger = ({ children }: { children: ReactNode }) => {
    const { toggleMenu } = useMenuModalContext();

    return (
        <button onClick={e => toggleMenu(e, "menu")} className='md:hidden'>
            {children}
        </button>
    );
};

const ModalTrigger = ({ children }: { children: ReactNode }) => {
    const { toggleMenu } = useMenuModalContext();

    return <button onClick={e => toggleMenu(e, "modal")}>{children}</button>;
};

const MobileMenuContent = ({ children }: { children: ReactNode }) => {
    const { isOpen, position } = useMenuModalContext();

    if (!isOpen) return null;

    return (
        <div
            className={`${sharedStyles} `}
            style={{ right: `${position.x}px`, top: `${position.y}px` }}>
            {children}
        </div>
    );
};

const ModalContent = ({ children }: { children: ReactNode }) => {
    const { isOpen, position, closeMenu } = useMenuModalContext();

    if (!isOpen) return null;

    return (
        <>
            {/* backdrop */}
            <div
                className='fixed inset-0 bg-black opacity-20 z-40'
                onClick={closeMenu}
            />

            {/* modal */}
            <div
                className={`${sharedStyles} -translate-y-1/2 -translate-x-1/2`}
                style={{ top: `${position.y}%`, left: `${position.x}%` }}>
                {children}
            </div>
        </>
    );
};

function useMenuModalContext() {
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
