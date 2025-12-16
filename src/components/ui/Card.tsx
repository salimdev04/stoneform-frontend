import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    action?: React.ReactNode;
}

export const Card = ({ children, className = "", title, action }: CardProps) => {
    return (
        <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-[20px] shadow-lg p-6 ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-6">
                    {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
