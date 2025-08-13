import type { ReactNode } from "react";
import { sharedStyles, useMenuModalContext } from "./Menu";

function ModalTrigger({ children }: { children: ReactNode }) {
    const { toggleMenu } = useMenuModalContext();

    return <button onClick={e => toggleMenu(e, "modal")}>{children}</button>;
}

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

export { ModalContent, ModalTrigger };
