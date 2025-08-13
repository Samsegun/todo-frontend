import type { ReactNode } from "react";
import { sharedStyles, useMenuModalContext } from "./Menu";

function MobileMenuTrigger({ children }: { children: ReactNode }) {
    const { toggleMenu } = useMenuModalContext();

    return (
        <button onClick={e => toggleMenu(e, "menu")} className='md:hidden'>
            {children}
        </button>
    );
}

function MobileMenuContent({ children }: { children: ReactNode }) {
    const { isOpen, position } = useMenuModalContext();

    if (!isOpen) return null;

    return (
        <div
            className={`${sharedStyles} `}
            style={{ right: `${position.x}px`, top: `${position.y}px` }}>
            {children}
        </div>
    );
}

export { MobileMenuContent, MobileMenuTrigger };
