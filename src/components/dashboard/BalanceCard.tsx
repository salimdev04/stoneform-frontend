import React from 'react';
import { Wallet, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { useAccount, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const BalanceCard: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { data: balanceData } = useBalance({
        address: address,
    });
    const { openConnectModal } = useConnectModal();
    const router = useRouter();

    // Mock data - to be replaced with Wagmi hooks later
    const balance = "0";
    const symbol = "STOF";
    const valueUsd = "0";
    const changePercentage = "+0%";

    return (
        <div className="w-full relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-white/10 to-transparent">
            {/* Inner background with glass effect */}
            <div className="bg-stone-dark/80 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 relative overflow-hidden h-full">

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-stone-cyan/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-stone-purple/5 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 h-full">
                    <div className="flex-grow">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-cyan/20 to-stone-purple/20 border border-white/5 flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-gray-400 font-medium">Your Holdings</span>
                            </div>
                            <div>
                                {isConnected && address ? (
                                    <div className="flex items-center gap-3 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm font-medium text-stone-cyan">
                                                {balanceData?.formatted ? parseFloat(balanceData.formatted).toFixed(4) : '0'} {balanceData?.symbol}
                                            </span>
                                        </div>
                                        <div className="h-4 w-px bg-white/10"></div>
                                        <div className="text-sm text-gray-400 font-mono">
                                            {address.slice(0, 6)}...{address.slice(-4)}
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={openConnectModal}
                                        className="flex items-center gap-2 bg-stone-cyan/10 hover:bg-stone-cyan/20 text-stone-cyan text-sm font-medium px-4 py-2 rounded-xl border border-stone-cyan/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Wallet className="w-4 h-4" />
                                        Connect Wallet
                                    </button>
                                )}
                            </div>

                        </div>

                        <div className="flex justify-between">
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                                        {balance}
                                        <span className="text-2xl sm:text-3xl text-stone-cyan ml-2">${symbol}</span>
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-lg text-gray-400">${valueUsd}</span>
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <TrendingUp className="w-3 h-3 text-green-400" />
                                        <span className="text-xs font-bold text-green-400">{changePercentage}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <Button variant="primary" onClick={() => router.push('/invest')} className="!px-6 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Buy More
                                </Button>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
