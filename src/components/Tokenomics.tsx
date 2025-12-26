import React, { useState } from 'react';
import { PieChart, TrendingUp, ShieldCheck, Users, Wallet, ArrowRight } from 'lucide-react';

const Tokenomics = () => {
    const distribution = [
        { label: 'Presale', percentage: 30, color: '#00c6ff', bg: 'bg-[#00c6ff]' },
        { label: 'Team', percentage: 15, color: '#d946ef', bg: 'bg-[#d946ef]' },
        { label: 'Reserve', percentage: 15, color: '#22c55e', bg: 'bg-[#22c55e]' },
        { label: 'Liquidity', percentage: 20, color: '#8b5cf6', bg: 'bg-[#8b5cf6]' },
        { label: 'Staking Rewards', percentage: 20, color: '#f97316', bg: 'bg-[#f97316]' },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // SVG Chart calculations
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <section className="w-full min-h-screen py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center relative overflow-hidden" id="tokenomics">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0a2e] via-stone-dark to-stone-dark opacity-60 -z-10"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-gradient">Tokenomics</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        A robust economic model designed for sustainability, growth, and community rewards.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side: SVG Interactive Chart */}
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-stone-cyan/10 blur-3xl rounded-full scale-110 opacity-50"></div>

                            <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
                                {distribution.map((item, index) => {
                                    const startFunc = cumulativePercent; // current start
                                    cumulativePercent += item.percentage / 100; // increment for next
                                    const endFunc = cumulativePercent;

                                    const [startX, startY] = getCoordinatesForPercent(startFunc);
                                    const [endX, endY] = getCoordinatesForPercent(endFunc);

                                    // If percentage is 100%, we draw a circle, but here we have segments.
                                    // Large arc flag
                                    const largeArcFlag = item.percentage > 50 ? 1 : 0;

                                    const pathData = `
                                    M ${startX} ${startY}
                                    A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
                                 `;

                                    // Calculate stroke dasharray for a circle if we used strictly circle element
                                    // But here we use path with stroke-width.
                                    // Let's use simple circles with dasharray for easier animation
                                    return null;
                                })}

                                {/* Re-rendering using Circle method for easier control */}
                                {(() => {
                                    let offset = 0;
                                    return distribution.map((item, index) => {
                                        const value = item.percentage;
                                        const circumference = 2 * Math.PI * 40; // r=40
                                        const dashArray = (value / 100) * circumference;
                                        const dashOffset = -((offset / 100) * circumference);
                                        offset += value;

                                        const isHovered = hoveredIndex === index;

                                        return (
                                            <circle
                                                key={index}
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                                stroke={item.color}
                                                strokeWidth={isHovered ? "12" : "10"}
                                                strokeDasharray={`${dashArray} ${circumference}`}
                                                strokeDashoffset={dashOffset}
                                                className="transition-all duration-300 cursor-pointer hover:brightness-125"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                                style={{ transformOrigin: '50px 50px' }}
                                                viewBox="0 0 100 100" // This doesn't apply to circle, parent SVG needs viewBox="0 0 100 100"
                                            />
                                        );
                                    });
                                })()}
                            </svg>

                            {/* Correct SVG wrapper for the circle method */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
                                {(() => {
                                    let offset = 0;
                                    return distribution.map((item, index) => {
                                        const value = item.percentage;
                                        const circumference = 2 * Math.PI * 40; // r=40
                                        const dashArray = (value / 100) * circumference;
                                        const dashOffset = -((offset / 100) * circumference); // dashoffset must be negative to rotate clockwise from start or positive for counter?
                                        // standard SVG circle starts at 3 o'clock. -rotate-90 puts it at 12 o'clock.
                                        // stroke-dashoffset: positive pushes the start back.
                                        // We need to accumulate offset.
                                        // Actually simpler: 
                                        // Each segment starts where previous ended.

                                        const currentOffset = offset;
                                        offset += value;

                                        const isHovered = hoveredIndex === index;

                                        return (
                                            <circle
                                                key={index}
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="transparent"
                                                stroke={item.color}
                                                strokeWidth={isHovered ? "8" : "6"}
                                                strokeDasharray={`${dashArray} ${circumference}`}
                                                strokeDashoffset={- (currentOffset / 100) * circumference}
                                                className="transition-all duration-300 cursor-pointer"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            />
                                        );
                                    });
                                })()}
                            </svg>

                            {/* Center Info */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="block text-4xl md:text-5xl font-bold text-white transition-all duration-300">
                                        {hoveredIndex !== null ? `${distribution[hoveredIndex].percentage}%` : '$STOF'}
                                    </span>
                                    <span className="text-sm md:text-lg text-stone-300 uppercase tracking-widest font-medium">
                                        {hoveredIndex !== null ? distribution[hoveredIndex].label : 'Allocation'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="flex flex-col gap-6">
                        {/* Legend */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-semibold mb-4 text-stone-200">Distribution Breakdown</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {distribution.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${hoveredIndex === index ? 'bg-white/10 scale-105' : 'hover:bg-white/5'}`}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: item.color, backgroundColor: item.color }}></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-200">{item.label}</span>
                                            <span className="text-xs text-gray-400 font-mono">{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Token Utility */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="w-5 h-5 text-stone-cyan" />
                                <h3 className="text-lg font-semibold text-stone-200">Token Utility</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Exclusive investment access to premium real estate",
                                    "Governance voting rights on platform decisions",
                                    "Staking rewards & priority dividend distribution"
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-stone-cyan mt-1.5"></div>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Ecosystem Value Flow - Full Width */}
                <div className="mt-12 w-full animate-fade-in-up">
                    <div className="glass-card rounded-2xl p-8 border border-white/5 bg-white/5 backdrop-blur-xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">

                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-stone-cyan/10 via-stone-cyan/30 to-stone-cyan/10 -z-10 hidden md:block"></div>

                            {/* Title (Mobile Only) */}
                            <div className="flex md:hidden items-center gap-2 mb-4 w-full">
                                <TrendingUp className="w-5 h-5 text-stone-cyan" />
                                <h3 className="text-lg font-semibold text-stone-200">Ecosystem Value Flow</h3>
                            </div>

                            {/* Title (Desktop - Absolute) */}
                            <div className="hidden md:flex absolute -top-12 left-0 items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-stone-cyan" />
                                <h3 className="text-lg font-semibold text-stone-200">Ecosystem Value Flow</h3>
                            </div>

                            {/* Step 1 */}
                            <div className="flex flex-col items-center gap-3 group z-10 bg-stone-dark/80 p-4 rounded-xl border border-transparent hover:border-stone-cyan/30 transition-all duration-300">
                                <div className="w-14 h-14 rounded-full bg-stone-dark border-2 border-stone-cyan/30 flex items-center justify-center group-hover:border-stone-cyan group-hover:shadow-[0_0_15px_rgba(0,198,255,0.3)] transition-all">
                                    <PieChart className="w-6 h-6 text-stone-cyan" />
                                </div>
                                <span className="text-sm font-bold text-gray-200 tracking-wide">Real Estate Assets</span>
                                <span className="text-xs text-gray-400 text-center max-w-[120px]">Premium global properties identified & acquired</span>
                            </div>

                            <ArrowRight className="w-6 h-6 text-stone-cyan/50 hidden md:block animate-pulse" />

                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-3 group z-10 bg-stone-dark/80 p-4 rounded-xl border border-transparent hover:border-stone-cyan/30 transition-all duration-300">
                                <div className="w-14 h-14 rounded-full bg-stone-dark border-2 border-stone-cyan/30 flex items-center justify-center group-hover:border-stone-cyan group-hover:shadow-[0_0_15px_rgba(0,198,255,0.3)] transition-all">
                                    <Wallet className="w-6 h-6 text-stone-cyan" />
                                </div>
                                <span className="text-sm font-bold text-gray-200 tracking-wide">Rental Income</span>
                                <span className="text-xs text-gray-400 text-center max-w-[120px]">Revenue generated via tenants & appreciation</span>
                            </div>

                            <ArrowRight className="w-6 h-6 text-stone-cyan/50 hidden md:block animate-pulse" />

                            {/* Step 3 */}
                            <div className="flex flex-col items-center gap-3 group z-10 bg-stone-dark/80 p-4 rounded-xl border border-transparent hover:border-stone-cyan/30 transition-all duration-300">
                                <div className="w-14 h-14 rounded-full bg-stone-dark border-2 border-stone-cyan/30 flex items-center justify-center group-hover:border-stone-cyan group-hover:shadow-[0_0_15px_rgba(0,198,255,0.3)] transition-all">
                                    <ShieldCheck className="w-6 h-6 text-stone-cyan" />
                                </div>
                                <span className="text-sm font-bold text-gray-200 tracking-wide">Smart Contract</span>
                                <span className="text-xs text-gray-400 text-center max-w-[120px]">Automated, transparent revenue distribution</span>
                            </div>

                            <ArrowRight className="w-6 h-6 text-stone-purple/50 hidden md:block animate-pulse" />

                            {/* Step 4 */}
                            <div className="flex flex-col items-center gap-3 group z-10 bg-stone-dark/80 p-4 rounded-xl border border-transparent hover:border-stone-purple/50 transition-all duration-300">
                                <div className="w-14 h-14 rounded-full bg-stone-dark border-2 border-stone-purple/30 flex items-center justify-center group-hover:border-stone-purple group-hover:shadow-[0_0_15px_rgba(180,50,255,0.3)] transition-all">
                                    <Users className="w-6 h-6 text-stone-purple" />
                                </div>
                                <span className="text-sm font-bold text-stone-purple tracking-wide">Token Holders</span>
                                <span className="text-xs text-gray-400 text-center max-w-[120px]">Receive dividends, staking rewards & value growth</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
