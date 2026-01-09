import React from 'react';
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2 } from 'lucide-react';

interface Transaction {
    id: string;
    type: 'buy' | 'claim';
    amount: string;
    tokenSymbol: string;
    cost: string;
    costSymbol: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    hash: string;
}

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'buy',
        amount: '5,000',
        tokenSymbol: 'STOF',
        cost: '0.25',
        costSymbol: 'ETH',
        date: '2024-03-10 14:30',
        status: 'completed',
        hash: '0x123...abc'
    },
    {
        id: '2',
        type: 'buy',
        amount: '2,500',
        tokenSymbol: 'STOF',
        cost: '0.125',
        costSymbol: 'ETH',
        date: '2024-03-12 09:15',
        status: 'completed',
        hash: '0x456...def'
    },
    {
        id: '3',
        type: 'buy',
        amount: '10,000',
        tokenSymbol: 'STOF',
        cost: '1,500',
        costSymbol: 'USDT',
        date: '2024-03-15 18:45',
        status: 'pending',
        hash: '0x789...ghi'
    }
];

const TransactionHistory: React.FC = () => {
    return (
        <div className="w-full mt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Transaction History
                <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Recent
                </span>
            </h3>

            <div className="glass-card rounded-2xl border border-white/5 overflow-hidden bg-stone-dark/40 backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-black/20 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price / Cost</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Hash</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${tx.type === 'buy' ? 'bg-stone-cyan/10 text-stone-cyan' : 'bg-stone-purple/10 text-stone-purple'
                                                }`}>
                                                {tx.type === 'buy' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                            </div>
                                            <span className="font-medium text-white capitalize">{tx.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-white font-bold">{tx.amount} {tx.tokenSymbol}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-gray-300">{tx.cost} {tx.costSymbol}</span>
                                            {/* Mock calculation for price per token if needed, or just static */}
                                            {/* <span className="text-xs text-gray-500">$0.32 / token</span> */}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {tx.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${tx.status === 'completed'
                                                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                                : tx.status === 'pending'
                                                    ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                                            }`}>
                                            {tx.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            <span className="capitalize">{tx.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <a href="#" className="text-stone-cyan hover:text-white transition-colors inline-flex items-center gap-1">
                                            <span className="font-mono text-sm">{tx.hash}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
