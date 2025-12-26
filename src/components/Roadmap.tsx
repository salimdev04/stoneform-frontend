import React from 'react';
import Image from 'next/image';
import { Rocket, Target, Globe, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        icon: <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />,
        phase: "Phase 1",
        time: "Q2–Q3 2025",
        title: "Foundation",
        description: "Presale, UK compliance, STOF deployment, $10M presale, first project launch (Dubai apartments).",
        color: "bg-[#00c6ff]", // Light Blue
        glow: "shadow-[#00c6ff]/50",
        status: "current"
    },
    {
        icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />,
        phase: "Phase 2",
        time: "Q3–Q4 2025",
        title: "Public Sale",
        description: "Public sale + first acquisitions, $12M raise, STOF listing, $22M asset portfolio, staking + DAO.",
        color: "bg-[#5832FF]", // Purple/Blue
        glow: "shadow-[#5832FF]/50",
        status: "upcoming"
    },
    {
        icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />,
        phase: "Phase 3",
        time: "Q1–Q4 2026",
        title: "Global Expansion",
        description: "Bangkok & Miami sites, DeFi integration, renovation & community governance.",
        color: "bg-[#d946ef]", // Pink/Magenta
        glow: "shadow-[#d946ef]/50",
        status: "upcoming"
    },
    {
        icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />,
        phase: "Phase 4",
        time: "Q1–Q4 2027",
        title: "Diversification",
        description: "Singapore, 90% occupancy milestone, $6.5M dividends, income expansion.",
        color: "bg-[#f43f5e]", // Red/Pink
        glow: "shadow-[#f43f5e]/50",
        status: "upcoming"
    },
    {
        icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />,
        phase: "Phase 5",
        time: "Q1–Q4 2028",
        title: "Mature Ecosystem",
        description: "London offices, hospitality tokens, ESG certifications, reach $200M managed portfolio.",
        color: "bg-[#f59e0b]", // Amber/Orange
        glow: "shadow-[#f59e0b]/50",
        status: "upcoming"
    }
];

const Roadmap = () => {
    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-stone-dark text-white flex flex-col justify-center items-center overflow-hidden" id="roadmap">
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/StoneformLPBackground.png"
                    alt="Roadmap Background"
                    fill
                    className="object-cover"
                    quality={100}
                />
                <div className="absolute inset-0 bg-stone-dark/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-dark via-transparent to-stone-dark"></div>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-dark to-transparent pointer-events-none z-20"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-dark to-transparent pointer-events-none z-20"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        <span className="text-gradient">Roadmap</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Our strategic path to revolutionizing real estate investment through blockchain technology.
                    </p>
                </div>

                <div className="relative">
                    {/* Desktop Connecting Line */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-stone-cyan/20 via-stone-purple/20 to-stone-cyan/20 rounded-full -z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 animate-[shimmer_3s_infinite]"></div>
                    </div>

                    {/* Mobile Connecting Line */}
                    <div className="block lg:hidden absolute left-[28px] top-[60px] bottom-[60px] w-1 bg-white/10 -z-10"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="flex lg:flex-col items-start lg:items-center group relative">
                                {/* Icon Circle Container */}
                                <div className="relative flex-shrink-0 z-10">
                                    {/* Glow */}
                                    <div className={`absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 ${step.color} ${step.glow}`}></div>

                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 ${index === 0 ? 'border-white animate-pulse-slow' : 'border-white/10'} bg-stone-dark shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/30`}>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${step.color}`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Status Badge (Mobile/Desktop) */}
                                    {step.status === 'current' && (
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-stone-dark animate-bounce">
                                            LIVE
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className="ml-6 lg:ml-0 lg:mt-8 flex-1 w-full">
                                    <div className="glass-card rounded-2xl p-6 border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] group-hover:border-white/10 h-full flex flex-col relative text-left lg:text-center">

                                        <div className="mb-3">
                                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/5 ${step.color.replace('bg-', 'text-')} mb-2 tracking-wider uppercase`}>
                                                {step.phase}
                                            </span>
                                            <div className="text-sm text-stone-300 font-mono flex items-center lg:justify-center gap-2">
                                                <span>{step.time}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
