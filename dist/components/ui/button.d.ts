import * as React from "react";
declare const buttonVariants: (props?: {
    variant?: "link" | "default" | "toolbar" | "toolbarActive" | "destructive" | "outline" | "secondary" | "ghost";
    size?: "icon" | "default" | "sm" | "lg";
} & {
    className?: string;
}) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "toolbar" | "toolbarActive" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
