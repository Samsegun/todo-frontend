type MenuListProps = {
    position: { x: number; y: number } | null;
    ref: React.RefObject<HTMLUListElement | null>;
    children: React.ReactNode;
};

function MenuList({ position, ref, children }: MenuListProps) {
    console.log(position, ref);

    return (
        <ul
            ref={ref}
            className={`fixed bg-white shadow-2xl 
            rounded-xl right-[${position?.x}px] top-[${position?.y}px]`}>
            {children}
        </ul>
    );
}

export default MenuList;
