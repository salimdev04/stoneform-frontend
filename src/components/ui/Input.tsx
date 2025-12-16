import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:border-stone-violet focus:ring-2 focus:ring-stone-violet/20 outline-none transition-all duration-200 bg-white/5 focus:bg-white/10 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
                        } ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
