import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { portfolio } from '../data/mock';
import { Wallet, PieChart, TrendingUp, ArrowUpRight, Download } from 'lucide-react';
import Image from 'next/image';

const Portfolio: NextPage = () => {
    // Calculate total stats from portfolio mock data
    const totalInvested = "$124,500.00";
    const currentValue = "$131,600.00";
    const totalGain = "+$7,100.00";

    return (
        <DashboardLayout>
            <Head>
                <title>Portfolio | StoneForm</title>
            </Head>

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-white">Your Portfolio</h1>

                {/* Portfolio Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Invested"
                        value={totalInvested}
                        icon={<Wallet size={24} />}
                    />
                    <StatCard
                        title="Current Value"
                        value={currentValue}
                        trend="5.7%"
                        trendUp={true}
                        icon={<PieChart size={24} />}
                    />
                    <StatCard
                        title="Total Earnings"
                        value={totalGain}
                        icon={<TrendingUp size={24} />}
                    />
                </div>

                {/* Active Investments List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Active Investments</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {portfolio.map((item) => (
                            <Card key={item.id} className="flex flex-col md:flex-row gap-6 items-center">
                                {/* Image */}
                                <div className="w-full md:w-48 h-32 relative rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                                    <Image
                                        src={item.image}
                                        alt={item.projectName}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                                    <div className="md:col-span-1">
                                        <h3 className="font-bold text-lg text-white">{item.projectName}</h3>
                                        <p className="text-sm text-gray-400">{item.location}</p>
                                        <div className="mt-2">
                                            <Badge variant={item.status === 'Active' ? 'success' : 'info'}>{item.status}</Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">Invested</p>
                                        <p className="font-bold text-white">{item.investedAmount}</p>
                                        <p className="text-xs text-gray-400 mt-2">Current Value</p>
                                        <p className="font-bold text-white">{item.currentValue}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">ROI</p>
                                        <p className={`font-bold ${item.roi.startsWith('+') ? 'text-green-400' : 'text-gray-300'}`}>{item.roi}</p>
                                        <p className="text-xs text-gray-400 mt-2">Next Payout</p>
                                        <p className="font-bold text-white">{item.nextPayoutDate}</p>
                                    </div>

                                    <div className="flex flex-col gap-2 justify-center">
                                        <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                                            <Download size={16} /> Details
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-stone-violet/10 hover:bg-stone-violet/20 text-stone-purple py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                                            <ArrowUpRight size={16} /> Withdraw
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Portfolio;
