import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { dashboardStats, recentTransactions } from '../data/mock';
import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingUp, Building } from 'lucide-react';

import { useAccount } from 'wagmi';

const Dashboard: NextPage = () => {
    const { address, isConnected } = useAccount();

    return (
        <DashboardLayout>
            <Head>
                <title>Dashboard | StoneForm</title>
            </Head>

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Overview</h1>
                        <p className="text-gray-400 mt-1">Welcome back, {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Guest"}! Here&apos;s what&apos;s happening with your portfolio.</p>
                    </div>
                    <Link
                        href="/invest"
                        className="bg-stone-violet hover:bg-stone-violet/80 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-stone-violet/40 transition-all flex items-center gap-2"
                    >
                        Invest Now <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Balance"
                        value={dashboardStats.totalBalance}
                        trend="2.5%"
                        trendUp={true}
                        icon={<DollarSign size={24} />}
                    />
                    <StatCard
                        title="Total Profit"
                        value={dashboardStats.totalProfit}
                        trend={dashboardStats.profitPercentage}
                        trendUp={true}
                        icon={<TrendingUp size={24} />}
                    />
                    <StatCard
                        title="Active Projects"
                        value={dashboardStats.activeProjects.toString()}
                        icon={<Building size={24} />}
                    />
                    <StatCard
                        title="Pending Payouts"
                        value={dashboardStats.pendingPayouts}
                        icon={<DollarSign size={24} />}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Transactions */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                            <Link href="/transactions" className="text-stone-violet hover:text-stone-purple text-sm font-semibold">View All</Link>
                        </div>
                        <Card className="!p-0 border border-gray-100 overflow-hidden">
                            <Table
                                data={recentTransactions}
                                columns={[
                                    {
                                        header: "Asset/Description", accessor: (item) => (
                                            <div className="font-medium text-white">{item.asset}</div>
                                        )
                                    },
                                    {
                                        header: "Type", accessor: (item) => (
                                            <span className="text-gray-400">{item.type}</span>
                                        )
                                    },
                                    { header: "Date", accessor: "date" },
                                    {
                                        header: "Amount", accessor: (item) => (
                                            <span className={`font-semibold ${item.type === "Withdrawal" ? "text-red-400" : "text-green-400"}`}>
                                                {item.type === "Withdrawal" ? "-" : "+"}{item.amount}
                                            </span>
                                        )
                                    },
                                    {
                                        header: "Status", accessor: (item) => (
                                            <Badge variant={item.status === "Completed" ? "success" : "warning"}>{item.status}</Badge>
                                        )
                                    },
                                ]}
                            />
                        </Card>
                    </div>

                    {/* Quick Portfolio Summary / Chart Stub */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white">Portfolio Distribution</h2>
                        <Card className="h-[300px] flex items-center justify-center bg-stone-violet/5 border-dashed border-2 border-stone-violet/20">
                            <div className="text-center text-gray-400">
                                <PieChartStub />
                                <p className="mt-4 text-sm font-medium">Portfolio Chart Component</p>
                                <p className="text-xs">(Coming Soon)</p>
                            </div>
                        </Card>
                        <Card title="Need Help?">
                            <p className="text-gray-400 text-sm mb-4">Contact our support team for assistance with your investments.</p>
                            <button className="w-full py-2 border border-white/10 rounded-lg text-gray-300 hover:bg-white/5 font-medium text-sm transition-colors">
                                Contact Support
                            </button>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const PieChartStub = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto opacity-50">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff20" strokeWidth="20" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#5832FF" strokeWidth="20" strokeDasharray="60 251" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#B432FF" strokeWidth="20" strokeDasharray="40 251" transform="rotate(0 50 50)" />
    </svg>
);

export default Dashboard;
