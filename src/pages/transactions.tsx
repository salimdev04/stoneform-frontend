import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { recentTransactions } from '../data/mock';
import { Download, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const Transactions: NextPage = () => {
    // In a real app, this would fetch from an API with pagination
    // For now we duplicate the mock data to make it look like a history list
    const allTransactions = [...recentTransactions, ...recentTransactions, ...recentTransactions].map((tx, i) => ({
        ...tx,
        id: `${tx.id}-${i}`
    }));

    const [searchTerm, setSearchTerm] = useState("");

    const filteredTransactions = allTransactions.filter(tx =>
        tx.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        // Simple CSV export simulation
        const headers = ["ID", "Type", "Asset", "Amount", "Date", "Status"];
        const rows = filteredTransactions.map(tx => [tx.id, tx.type, tx.asset, tx.amount, tx.date, tx.status]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Transaction History | StoneForm</title>
            </Head>

            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-white">Transaction History</h1>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors font-medium text-sm"
                    >
                        <Download size={18} /> Export CSV
                    </button>
                </div>

                <Card className="!p-0 border border-white/10 overflow-hidden">
                    {/* Filters Toolbar */}
                    <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by asset or type..."
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-stone-violet focus:ring-1 focus:ring-stone-violet text-white placeholder-gray-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 text-sm font-medium">
                            <Filter size={16} /> Filter
                        </button>
                    </div>

                    <Table
                        data={filteredTransactions}
                        columns={[
                            {
                                header: "Type", accessor: (item) => (
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'Deposit' ? 'bg-green-500/20 text-green-400' :
                                            item.type === 'Withdrawal' ? 'bg-red-500/20 text-red-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {item.type[0]}
                                        </div>
                                        <span className="font-medium text-white">{item.type}</span>
                                    </div>
                                )
                            },
                            { header: "Asset/Description", accessor: "asset", className: "hidden md:table-cell" },
                            { header: "Date", accessor: "date", className: "hidden sm:table-cell" },
                            {
                                header: "Amount", accessor: (item) => (
                                    <span className={`font-bold ${item.type === "Withdrawal" ? "text-red-400" : "text-white"}`}>
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

                    {/* Pagination stub */}
                    <div className="p-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-500">
                        <span>Showing {filteredTransactions.length} results</span>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50 text-gray-400" disabled>Previous</button>
                            <button className="px-3 py-1 bg-stone-violet text-white rounded">1</button>
                            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 text-gray-400">2</button>
                            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 text-gray-400">Next</button>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Transactions;
