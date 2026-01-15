import React, { useMemo } from 'react';
import { Target, TrendingUp, Info } from 'lucide-react';
import { useStoneformICO } from '../../hooks/useStoneformICO';
import { formatUnits } from 'viem';
import { useBalance, useReadContracts } from 'wagmi';
import StoneformICOABI from '../../ABI/StoneformICO.json';

const PresaleProgress: React.FC = () => {
    // Contract Data
    const { useGetTokenAmountPerUSD, ICO_ADDRESS } = useStoneformICO();
    const { data: stofRate } = useGetTokenAmountPerUSD();

    // 1. Fetch Payment Token Details (to get addresses for USDT/USDC)
    const { data: paymentTokens } = useReadContracts({
        contracts: [
            { address: ICO_ADDRESS, abi: StoneformICOABI, functionName: 'paymentDetails', args: [BigInt(1)] }, // USDT
            { address: ICO_ADDRESS, abi: StoneformICOABI, functionName: 'paymentDetails', args: [BigInt(2)] }, // USDC
        ]
    });

    // Access result safely
    const usdtDetails = paymentTokens?.[0]?.result as any;
    const usdcDetails = paymentTokens?.[1]?.result as any;

    // ABI Returns tuple: [paymentName, priceFetchContract, paymentTokenAddress, decimal, status]
    const usdtAddress = usdtDetails?.[2];
    const usdcAddress = usdcDetails?.[2];

    // 2. Fetch Prices (BNB, USDT, USDC)
    const { data: prices } = useReadContracts({
        contracts: [
            { address: ICO_ADDRESS, abi: StoneformICOABI, functionName: 'getLatestPrice', args: [BigInt(0)] }, // BNB
            { address: ICO_ADDRESS, abi: StoneformICOABI, functionName: 'getLatestPrice', args: [BigInt(1)] }, // USDT
            { address: ICO_ADDRESS, abi: StoneformICOABI, functionName: 'getLatestPrice', args: [BigInt(2)] }, // USDC
        ]
    });

    // 3. Fetch Contract Balances
    const { data: bnbBalance } = useBalance({ address: ICO_ADDRESS });
    const { data: usdtBalance } = useBalance({ address: ICO_ADDRESS, token: usdtAddress as `0x${string}` });
    const { data: usdcBalance } = useBalance({ address: ICO_ADDRESS, token: usdcAddress as `0x${string}` });

    // 4. Calculate Total Raised in USD
    const totalRaised = useMemo(() => {
        if (!prices || !bnbBalance) return 8_500_000; // Fallback to mock

        const bnbPrice = Number(formatUnits((prices[0]?.result as bigint) || BigInt(0), 8));
        const usdtPrice = Number(formatUnits((prices[1]?.result as bigint) || BigInt(0), 8));
        const usdcPrice = Number(formatUnits((prices[2]?.result as bigint) || BigInt(0), 8));

        const bnbValue = Number(bnbBalance.formatted) * bnbPrice;
        const usdtValue = Number(usdtBalance?.formatted || 0) * usdtPrice;
        const usdcValue = Number(usdcBalance?.formatted || 0) * usdcPrice;

        return bnbValue + usdtValue + usdcValue;
    }, [prices, bnbBalance, usdtBalance, usdcBalance, usdtBalance?.formatted, usdcBalance?.formatted]);

    // Mock Data based on requirements (Not available on-chain)
    const currentStage = 1;
    const totalStages = 6;
    const softCap = 25_000_000; // $25M
    const hardCap = 50_000_000; // $50M

    // Calculate price from rate (Rate is tokens per USD, so Price is 1/Rate)
    const currentPrice = stofRate ? (1 / Number(formatUnits(stofRate as bigint, 18))).toFixed(4) : "0.32";
    const nextPrice = 0.06;

    const progressPercentage = (totalRaised / hardCap) * 100;
    const softCapPercentage = (softCap / hardCap) * 100;

    // Display logic for small percentages
    const displayPercentage = progressPercentage > 0 && progressPercentage < 0.1
        ? '< 0.1'
        : progressPercentage.toFixed(1);

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
                            <div className="w-[1px] h-16 bg-white/10"></div>
                            <div>
                                <span className="text-lg font-bold text-gray-400 block">${nextPrice}</span>
                                <span className="text-xs text-gray-400">Next stage</span>
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
                            {displayPercentage}%
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
                            style={{ width: `${Math.max(progressPercentage, totalRaised > 0 ? 1 : 0)}%` }}
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
