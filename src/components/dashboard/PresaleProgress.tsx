import React from 'react';
import { Target, TrendingUp, Info } from 'lucide-react';

const PresaleProgress: React.FC = () => {
    // Mock Data based on requirements
    const currentStage = 1;
    const totalStages = 6;
    const softCap = 25_000_000; // $25M
    const hardCap = 50_000_000; // $50M
    const totalRaised = 8_500_000; // Mock current raised amount
    const currentPrice = 0.32;
    const nextPrice = 0.38;

    const progressPercentage = (totalRaised / hardCap) * 100;
    const softCapPercentage = (softCap / hardCap) * 100;

    return (
        <div className="w-full mb-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-cyan"></span>
                </span>
                Live Presale Status
            </h3>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/5 bg-stone-dark/40 backdrop-blur-md relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-stone-cyan/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
                    {/* Stage Info */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-400 text-sm font-medium">Current Stage</span>
                            <span className="text-xs bg-stone-cyan/10 text-stone-cyan px-2 py-0.5 rounded-full border border-stone-cyan/20">Open</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">Stage {currentStage}</span>
                            <span className="text-gray-500 font-medium">/ {totalStages}</span>
                        </div>
                        <div className="mt-2 text-xs text-stone-300">
                            Fills when round target met
                        </div>
                    </div>

                    {/* Price Info */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <span className="text-gray-400 text-sm font-medium">Token Price</span>
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-2xl font-bold text-white block">${currentPrice}</span>
                                <span className="text-xs text-stone-cyan">Current</span>
                            </div>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div>
                                <span className="text-2xl font-bold text-gray-400 block">${nextPrice}</span>
                                <span className="text-xs text-gray-500">Next Stage</span>
                            </div>
                        </div>
                    </div>

                    {/* Cap Info */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <span className="text-gray-400 text-sm font-medium">Fundraising Goal</span>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Soft Cap</span>
                                <span className="text-white font-bold">${(softCap / 1_000_000).toFixed(0)}M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Hard Cap</span>
                                <span className="text-white font-bold">${(hardCap / 1_000_000).toFixed(0)}M</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar Section */}
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <span className="text-gray-400 text-sm block mb-1">Total Raised</span>
                            <span className="text-3xl font-bold text-white tracking-tight">${totalRaised.toLocaleString()}</span>
                        </div>
                        <span className="text-stone-cyan font-bold bg-stone-cyan/10 px-3 py-1 rounded-lg border border-stone-cyan/20">
                            {progressPercentage.toFixed(1)}%
                        </span>
                    </div>

                    <div className="relative h-6 bg-black/40 rounded-full border border-white/5 overflow-hidden">
                        {/* Soft Cap Marker */}
                        <div
                            className="absolute top-0 bottom-0 w-px bg-white/30 z-20 dashed-line"
                            style={{ left: `${softCapPercentage}%` }}
                        ></div>
                        <div
                            className="absolute -top-6 text-[10px] text-gray-400 transform -translate-x-1/2"
                            style={{ left: `${softCapPercentage}%` }}
                        >
                            Soft Cap ($25M)
                        </div>

                        {/* Animated Gradient Bar */}
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-stone-cyan to-stone-purple rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>$0</span>
                        <span>Hard Cap: $50M</span>
                    </div>
                </div>

                {/* Disclaimer / Info */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2 text-xs text-gray-400">
                    <Info className="w-4 h-4 shrink-0 text-stone-300 mt-0.5" />
                    <p>
                        Presale stages occur sequentially. Once a stage&apos;s allocation is filled, the price increases immediately to the next tier.
                        Smart contract ensures hard cap of $50M cannot be exceeded.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PresaleProgress;
