import React from "react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
    const variants = {
        success: "bg-green-500/10 text-green-300",
        warning: "bg-yellow-500/10 text-yellow-300",
        error: "bg-red-500/10 text-red-300",
        info: "bg-stone-violet/10 text-stone-purple",
        default: "bg-white/10 text-gray-300",
    };

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};
