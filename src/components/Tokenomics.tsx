import React, { useState } from 'react';
import Image from 'next/image';
import { PieChart, TrendingUp, ShieldCheck, Users, Wallet, ArrowRight, Building, Coins, Lock, Star, Tag, Hash, Globe, Database, CheckCircle2, Shield } from 'lucide-react';

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
                       A regulated, asset-backed token model designed to align investors with real-world real estate performance.
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
                                                viewBox="0 0 100 100"
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
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-stone-purple/10 border border-stone-purple/20">
                                    <Database className="w-5 h-5 text-stone-purple" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Token Overview</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-stone-cyan transition-colors">
                                        <Tag className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Token Name</span>
                                    </div>
                                    <p className="font-bold text-white text-lg">STONEFORM</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-stone-cyan transition-colors">
                                        <Hash className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Symbol</span>
                                    </div>
                                    <p className="font-bold text-white text-lg">STOF</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-stone-cyan transition-colors">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Network</span>
                                    </div>
                                    <p className="font-bold text-white text-lg">Binance Smart Chain</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-stone-cyan transition-colors">
                                        <Coins className="w-4 h-4" />
                                        <span className="text-xs font-medium uppercase tracking-wider">Supply</span>
                                    </div>
                                    <p className="font-bold text-white text-lg">1,000,000,000</p>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-stone-cyan/10 border border-stone-cyan/20">
                                    <PieChart className="w-5 h-5 text-stone-cyan" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Distribution</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {distribution.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center cursor-pointer gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 ${hoveredIndex === index ? 'bg-white/10 border-white/10 scale-[1.02] shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <div className="w-4 h-4 rounded-full shadow-[0_0_12px_currentColor]" style={{ color: item.color, backgroundColor: item.color }}></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-white">{item.label}</span>
                                            <span className="text-xs text-gray-400 font-mono mt-0.5">{item.percentage}% Allocation</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Token Utility */}
                <div className="py-8 mt-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-stone-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-stone-cyan/10 transition-colors duration-500"></div>

                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="p-2 rounded-xl bg-stone-cyan/10 border border-stone-cyan/20">
                            <ShieldCheck className="w-6 h-6 text-stone-cyan" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Token Utility</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {[
                            { icon: Building, text: "Fractional Real Estate Exposure", sub: "Represents fractional exposure to tokenized real estate assets held within the STONEFORM ecosystem." },
                            { icon: Coins, text: "Revenue Distribution", sub: "Eligible STOF holders may receive on-chain revenue distributions from rental income and asset sales, where compliant." },
                            { icon: Users, text: "Governance Rights", sub: "Participate in governance decisions related to property acquisitions, asset management, and platform policies." },
                            { icon: Lock, text: "Staking Rewards", sub: "Stake STOF to access tiered platform features and long-term ecosystem incentives." },
                            { icon: Star, text: "Priority Access", sub: "Access priority participation opportunities in selected tokenized real estate projects." },
                            { icon: Shield, text: "Portfolio Transparency", sub: "Track asset performance, portfolio data, and revenue flows through transparent on-chain reporting." }
                        ].map((item, i) => (
                            <div key={i} className="group/item flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-stone-cyan/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-stone-dark/50 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                    <item.icon className="w-5 h-5 text-stone-cyan group-hover/item:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-stone-100 mb-1">{item.text}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed font-light">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Sections: Sale, Vesting, Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full animate-fade-in-up">

                    {/* Token Sale Structure */}
                    <div className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-stone-purple/30 transition-all duration-500 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-stone-purple/10 border border-stone-purple/20 group-hover:scale-110 transition-transform duration-500">
                                <TrendingUp className="w-6 h-6 text-stone-purple" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Sale Structure</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { label: "5 Phases", desc: "Foundation, Seed, Pre-Public, Public, and Pre-Listing phases." },
                                { label: "Pricing", desc: "Phase-based pricing with predefined valuation increases." },
                                { label: "Release", desc: "Controlled token release governed by predefined vesting schedules." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-stone-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-stone-purple"></div>
                                    </div>
                                    <div>
                                        <span className="block text-white font-semibold text-sm mb-1">{item.label}</span>
                                        <span className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Vesting & Release */}
                    <div className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-stone-cyan/30 transition-all duration-500 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-stone-cyan/10 border border-stone-cyan/20 group-hover:scale-110 transition-transform duration-500">
                                <Wallet className="w-6 h-6 text-stone-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Vesting & Release</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { label: "Team", desc: "0% at TGE, followed by an 18-month linear vesting schedule." },
                                { label: "Public Sale", desc: "Partial unlock after defined lock-up periods, followed by linear release schedules." },
                                { label: "Reserve", desc: "Progressive release over 18 months to support acquisitions, staking incentives, and ecosystem growth." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-stone-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-stone-cyan"></div>
                                    </div>
                                    <div>
                                        <span className="block text-white font-semibold text-sm mb-1">{item.label}</span>
                                        <span className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Why It Works */}
                    <div className="glass-card rounded-3xl p-8 border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-green-400/30 transition-all duration-500 group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Why It Works</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Backed by real-world, income-generating real estate assets.",
                                "Reduces speculative behavior through strict vesting and controlled token releases.",
                                "Aligns investors with long-term real estate performance and ecosystem growth."
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300 leading-relaxed font-light">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
