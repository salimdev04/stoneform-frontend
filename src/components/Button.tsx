import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    glowColor?: string;
}

export default function Button({
    children,
    className = "",
    variant = "primary",
    glowColor = "rgba(0, 180, 216, 0.5)", // Default to the blue from the image
    ...props
}: ButtonProps) {

    const baseStyles = "relative group px-4 py-3 sm:px-12 sm:py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center";

    const variants = {
        primary: "text-white shadow-[0_4px_15px_rgba(180,50,255,0.4)] bg-gradient-to-r from-stone-violet to-stone-purple shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_4px_rgba(0,0,0,0.2)] border-b-4 border-[#3a1a99] active:border-b-0 active:translate-y-1",
        secondary: "text-stone-purple bg-transparent backdrop-blur-md border border-stone-purple hover:bg-stone-purple/10",
        outline: "text-stone-purple border-2 border-stone-purple hover:bg-stone-purple/10",
        ghost: "text-stone-purple hover:bg-stone-purple/10",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Removed the absolute divs for primary since we are using CSS gradients/shadows on the button itself now */}

            <span className="relative z-10 drop-shadow-md flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
