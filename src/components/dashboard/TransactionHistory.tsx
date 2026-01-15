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

import { useAccount, usePublicClient } from 'wagmi';
import { formatUnits } from 'viem';
import { useEffect, useState, useMemo } from 'react';
import { useStoneformICO } from '../../hooks/useStoneformICO';
import StoneformICOABI from '../../ABI/StoneformICO.json';

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

const TransactionHistory: React.FC = () => {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const { useGetTokenAmountPerUSD } = useStoneformICO();
    const { data: stofRate } = useGetTokenAmountPerUSD();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const tokenPrice = useMemo(() => {
        if (!stofRate) return 0;
        return 1 / Number(formatUnits(stofRate as bigint, 18));
    }, [stofRate]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!address || !publicClient) return;

            setIsLoading(true);
            try {
                const currentBlock = await publicClient.getBlockNumber();

                // Get 'TokenBuyed' events (last 9900 blocks to stay within RPC limits)
                const fromBlock = currentBlock - BigInt(9900);

                const logs = await publicClient.getContractEvents({
                    address: process.env.NEXT_PUBLIC_STONEFORM_ICO_ADDRESS as `0x${string}`,
                    abi: StoneformICOABI,
                    eventName: 'TokenBuyed',
                    args: {
                        to: address,
                    },
                    fromBlock: fromBlock > BigInt(0) ? fromBlock : BigInt(0),
                });


                const formattedTxs: Transaction[] = await Promise.all(logs.map(async (log) => {
                    const block = await publicClient.getBlock({ blockHash: log.blockHash });
                    const date = new Date(Number(block.timestamp) * 1000).toLocaleString();
                    const amount = formatUnits(((log as any).args?.amount) || BigInt(0), 18);

                    return {
                        id: log.transactionHash,
                        type: 'buy',
                        amount: parseFloat(amount).toFixed(2),
                        tokenSymbol: 'STOF',
                        cost: tokenPrice ? (Number(amount) * tokenPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-',
                        costSymbol: '$',
                        date: date,
                        status: 'completed',
                        hash: log.transactionHash
                    };
                }));

                // Sort by date desc
                setTransactions(formattedTxs.reverse());
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [address, publicClient]);

    if (!address) return null;
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
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Hash</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Loading transactions...
                                    </td>
                                </tr>
                            )}
                            {!isLoading && transactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                            {transactions.map((tx) => (
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
                                            <span className="text-white font-medium">{tx.costSymbol}{tx.cost}</span>
                                            {tokenPrice > 0 && (
                                                <span className="text-[10px] text-gray-500">${tokenPrice.toFixed(4)} / STOF</span>
                                            )}
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
                                        <a
                                            href={`https://bscscan.com/tx/${tx.hash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-stone-cyan hover:text-white transition-colors inline-flex items-center gap-1"
                                        >
                                            <span className="font-mono text-sm">{tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</span>
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
