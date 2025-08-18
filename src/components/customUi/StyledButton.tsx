// import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

// 1. Define your button variants using cva (the shadcn pattern)
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            // You can add other variants like size here
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

// 2. Create the final props type
export type ButtonProps = React.ComponentPropsWithRef<"button"> &
    VariantProps<typeof buttonVariants>;

// 3. Implement the component using the new props
const StyledButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                {...props} // Spread the rest of the props here
            />
        );
    }
);
StyledButton.displayName = "StyledButton";

export default StyledButton;
