import type { ReactNode } from "react";
import { Button } from "../ui/button";

// const VariantType = {
//     LINK: "link",
//     DEFAULT: "default",
//     DESTRUCTIVE: "destructive",
//     OUTLINE: "outline",
//     SECONDARY: "secondary",
//     GHOST: "ghost",
//     NULL: "null",
//     UNDEFINED: "undefined"
// } as const

// type VariantType = typeof VariantType[keyof typeof VariantType]

type StyledButtonProps = {
    children: ReactNode;
    variant:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
    styles?: string;
};

function StyledButton({ children, variant, styles }: StyledButtonProps) {
    const styling = styles ? `${styles} cursor-pointer` : "cursor-pointer";

    return (
        <Button variant={variant} className={styling}>
            {children}
        </Button>
    );
}

export default StyledButton;
