import React, { useState } from 'react';
import Image from 'next/image';
import { PieChart, TrendingUp, ShieldCheck, Users, Wallet, ArrowRight } from 'lucide-react';

const Tokenomics = () => {
    const distribution = [
        { label: 'Token Sale', percentage: 50, color: '#00c6ff', bg: 'bg-[#00c6ff]' },
        { label: 'Ecosystem Reserve', percentage: 25, color: '#22c55e', bg: 'bg-[#22c55e]' },
        { label: 'Team & Advisors', percentage: 15, color: '#d946ef', bg: 'bg-[#d946ef]' },
        { label: 'Marketing & Liquidity', percentage: 10, color: '#f97316', bg: 'bg-[#f97316]' },
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
            <div className="absolute inset-0 z-0">
                <Image
                    src="/STONEFORMwebbgfinal3.png"
                    alt="Tokenomics Background"
                    fill
                    className="object-cover opacity-40 mix-blend-soft-light"
                    quality={100}
                />
                <div className="absolute inset-0 bg-stone-dark/60"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-purple/10 via-stone-dark/80 to-stone-dark"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">Tokenomics</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        A compliant, asset-backed economic model designed to support long-term growth, transparency, and investor participation.
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
                        {/* Token Overview */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-semibold mb-4 text-stone-200">Token Overview</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Token Name</p>
                                    <p className="font-semibold text-white">STONEFORM Token</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Symbol</p>
                                    <p className="font-semibold text-white">STOF</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Blockchain</p>
                                    <p className="font-semibold text-white">BSC (BSC-20)</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Total Supply</p>
                                    <p className="font-semibold text-white">1,000,000,000</p>
                                </div>
                            </div>
                        </div>

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

                    </div>
                </div>

                {/* Token Utility */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl mt-12">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-stone-cyan" />
                        <h3 className="text-lg font-semibold text-stone-200">Token Utility</h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "Gain fractional exposure to tokenized real estate assets",
                            "Receive on-chain revenue distributions from rental income",
                            "Participate in platform governance through voting rights",
                            "Stake tokens for additional rewards and ecosystem incentives",
                            "Access priority investment opportunities and benefits"
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-cyan mt-1.5 min-w-[6px]"></div>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Detailed Sections: Sale, Vesting, Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full animate-fade-in-up">

                    {/* Token Sale Structure */}
                    <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-stone-purple" />
                            <h3 className="text-lg font-semibold text-stone-200">Token Sale Structure</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-purple mt-2"></div>
                                <span><strong>5 Phases:</strong> Foundation, Seed, Private, Pre-Public, Public.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-purple mt-2"></div>
                                <span><strong>Pricing:</strong> Phase-based pricing with gradual increases.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-purple mt-2"></div>
                                <span><strong>Release:</strong> Controlled token release aligned with milestones.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Vesting & Release */}
                    <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <Wallet className="w-5 h-5 text-stone-cyan" />
                            <h3 className="text-lg font-semibold text-stone-200">Vesting & Release</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-cyan mt-2"></div>
                                <span><strong>Team:</strong> 0% at TGE, 18-month linear vesting.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-cyan mt-2"></div>
                                <span><strong>Sale:</strong> Partial unlock at TGE, linear release thereafter.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-stone-cyan mt-2"></div>
                                <span><strong>Reserve:</strong> Progressive release over 18 months for growth.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Why It Works */}
                    <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-semibold text-stone-200">Why It Works</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-400 mt-2"></div>
                                <span>Backed by real-world income-generating assets.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-400 mt-2"></div>
                                <span>Prevents speculation through strict vesting.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-400 mt-2"></div>
                                <span>Aligns investors with long-term ecosystem growth.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
