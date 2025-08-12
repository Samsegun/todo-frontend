import type { ReactNode } from "react";

type ButtonProps = {
    style?: string;
    children: ReactNode;
};

function Button({ children, style }: ButtonProps) {
    return (
        <button
            className={`pointer-events-none md:pointer-events-auto cursor-pointer flex items-center transition-colors
                     duration-150 hover:bg-gray-700 ${style}`}>
            {children}
        </button>
    );
}

export default Button;
