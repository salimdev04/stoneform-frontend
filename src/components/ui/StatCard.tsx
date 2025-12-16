import React from "react";
import { Card } from "./Card";

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ReactNode;
}

export const StatCard = ({ title, value, trend, trendUp, icon }: StatCardProps) => {
    return (
        <Card className="hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
                    <h4 className="text-2xl font-bold text-white leading-tight">{value}</h4>
                </div>
                {icon && (
                    <div className="p-3 bg-stone-violet/10 rounded-xl text-stone-purple">
                        {icon}
                    </div>
                )}
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1 text-sm">
                    <span
                        className={`font-bold ${trendUp ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {trendUp ? "↑" : "↓"} {trend}
                    </span>
                    <span className="text-gray-400">vs last month</span>
                </div>
            )}
        </Card>
    );
};
