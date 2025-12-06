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

    const baseStyles = "relative group px-8 py-3 sm:px-12 sm:py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center";

    const variants = {
        primary: "text-white shadow-[0_0_60px_rgba(0,180,216,0.6)]",
        secondary: "text-[#00B4FF] bg-transparent backdrop-blur-md border border-[#00B4FF] hover:bg-[#00B4FF]/10",
        outline: "text-[#00B4FF] border-2 border-[#00B4FF] hover:bg-[#00B4FF]/10",
        ghost: "text-[#00B4FF] hover:bg-[#00B4FF]/10",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {variant === "primary" && (
                <>
                    {/* Main Gradient Background - Matching the uploaded blue/cyan image */}
                    <div className="absolute inset-0 bg-[#00b4d8] opacity-90 group-hover:opacity-100 transition-opacity" />

                    {/* Inner Glow/Border Effect */}
                    <div className="absolute inset-[1px] rounded-full border border-white/20 bg-[#00b4d8] -z-10" />
                </>
            )}

            <span className="relative z-10 drop-shadow-md flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
