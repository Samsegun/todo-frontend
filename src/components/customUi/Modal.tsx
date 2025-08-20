import { cloneElement, type MouseEvent, type ReactElement } from "react";
import { sharedStyles, useMenuModalContext } from "./Menu";

function ModalTrigger({
    children,
}: {
    children: ReactElement<{ onClick?: (e: MouseEvent<HTMLElement>) => void }>;
}) {
    const { toggleMenu } = useMenuModalContext();

    return cloneElement(children, {
        onClick: (e: MouseEvent<HTMLElement>) => {
            toggleMenu(e, "modal");
        },
    });
}

const ModalContent = ({ children }: { children: ReactElement }) => {
    const { isOpen, position, closeMenu } = useMenuModalContext();

    if (!isOpen) return null;

    return (
        <>
            {/* backdrop */}
            <div
                className='fixed inset-0 bg-black opacity-50 z-40'
                onClick={closeMenu}
            />

            {/* modal */}
            <section
                className={`${sharedStyles} -translate-y-1/2 -translate-x-1/2 w-4/5 md:w-[500px]`}
                style={{ top: `${position.y}%`, left: `${position.x}%` }}>
                {children}
            </section>
        </>
    );
};

export { ModalContent, ModalTrigger };
