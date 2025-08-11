import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Menu } from "lucide-react";
import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type MouseEvent,
    type ReactNode,
    type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import MenuList from "./OldMenuList";

type MenusProps = {
    children: ReactNode;
};

type MenusContextProps = {
    open: Dispatch<SetStateAction<string>>;
    openId: string;
    close: () => void;
    position: { x: number; y: number } | null;
    setPosition: Dispatch<SetStateAction<{ x: number; y: number } | null>>;
};

const MenusContext = createContext<MenusContextProps>({
    open: () => {},
    openId: "",
    close: () => {},
    position: null,
    setPosition: () => {},
});

function Menus({ children }: MenusProps) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState<{ x: number; y: number } | null>(
        null
    );

    const open = setOpenId;
    const close = () => setOpenId("");

    return (
        <MenusContext.Provider
            value={{ open, openId, close, position, setPosition }}>
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }: { id: string }) {
    const { openId, close, open, setPosition } = useContext(MenusContext);

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        console.log(e);

        const rect = (e.target as HTMLElement)
            .closest("button")!
            .getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        console.log("openId: ", id);
        openId === "" || openId !== id ? open(id) : close();
    };

    return (
        <Menu
            onClick={(e: MouseEvent) => handleClick(e)}
            className='cursor-pointer md:hidden'
        />
    );
}

function List({ id, children }: { id: string; children: ReactNode }) {
    const { openId, position, close } = useContext(MenusContext);
    const ref = useOutsideClick(close, false);

    if (openId !== id) return null;

    return createPortal(
        <MenuList position={position} ref={ref}>
            {children}
        </MenuList>,
        document.body
    );
}

function MenuContainer({ children }: { children: ReactNode }) {
    return <div className='bg-amber-500'>{children}</div>;
}

Menus.Menu = MenuContainer;
Menus.List = List;
Menus.Toggle = Toggle;

export default Menus;
