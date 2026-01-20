import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { useAccount } from 'wagmi';
import { formatUnits, decodeEventLog, keccak256, toHex, createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';
import { useStoneformICO } from '../../hooks/useStoneformICO';
import StoneformICOABI from '../../ABI/StoneformICO.json';

interface Transaction {
    id: string;
    type: 'buy' | 'claim';
    amount: string;
    tokenSymbol: string;
    cost: string;
    costSymbol: string;
    paymentToken: string;
    paymentAmount: string;
    date: string;
    timestamp: number;
    status: 'completed' | 'pending' | 'failed';
    hash: string;
    blockNumber: bigint;
}

const ICO_START_BLOCK = 75437326;
const MAX_TRANSACTIONS = 1000;
const BSCSCAN_API_KEY = process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || 'YourApiKeyToken';
const ICO_ADDRESS = process.env.NEXT_PUBLIC_STONEFORM_ICO_ADDRESS as string;
const BLOCK_RANGE = 500;

const publicClient = createPublicClient({
    chain: bsc,
    transport: http()
});

const TransactionHistory: React.FC = () => {
    const { address } = useAccount();
    const { useGetTokenPerUSD, useGetPaymentTokens } = useStoneformICO();
    const { data: stofRate } = useGetTokenPerUSD();
    
    const { data: paymentToken0 } = useGetPaymentTokens(0);
    const { data: paymentToken1 } = useGetPaymentTokens(1);
    const { data: paymentToken2 } = useGetPaymentTokens(2);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const tokenPrice = useMemo(() => {
        if (!stofRate) return 0;
        return 1 / Number(formatUnits(stofRate as bigint, 18));
    }, [stofRate]);

    const paymentTokenMap = useMemo(() => {
        const map = new Map<string, { symbol: string; decimals: number }>();
        
        const tokens = [paymentToken0, paymentToken1, paymentToken2];
        tokens.forEach((tokenData) => {
            if (tokenData && Array.isArray(tokenData) && tokenData.length >= 5) {
                const [symbol, tokenAddress, , decimals, isActive] = tokenData;
                if (isActive && tokenAddress) {
                    map.set(tokenAddress.toLowerCase(), {
                        symbol: symbol || 'Unknown',
                        decimals: Number(decimals) || 18
                    });
                }
            }
        });
        
        return map;
    }, [paymentToken0, paymentToken1, paymentToken2]);

    const fetchHistory = useCallback(async (isRefresh = false) => {
        if (!address) return;

        if (isRefresh) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        setError(null);

        try {
            const eventSignature = keccak256(toHex('TokensPurchased(address,address,uint256)'));
            const addressTopic = `0x000000000000000000000000${address.slice(2).toLowerCase()}`;

            const params = new URLSearchParams({
                chainid: '56',
                module: 'logs',
                action: 'getLogs',
                fromBlock: ICO_START_BLOCK.toString(),
                toBlock: 'latest',
                address: ICO_ADDRESS,
                topic0: eventSignature,
                topic1: addressTopic,
                topic2: addressTopic,
                topic1_2_opr: 'or',
                page: '1',
                offset: MAX_TRANSACTIONS.toString(),
                apikey: BSCSCAN_API_KEY
            });

            const url = `https://api.bscscan.com/api?${params.toString()}`;
            console.log('Fetching logs from BscScan:', url);

            const response = await fetch(url);
            const data = await response.json();

            console.log('BscScan API response:', data);

            let uniqueLogs: any[] = [];
            if (data.status === '1' && Array.isArray(data.result)) {
                console.log(`Found ${data.result.length} logs`);
                uniqueLogs = data.result;
            } else {
                console.warn('BscScan API failed or returned no results:', data.message || data.result);
                console.log('Falling back to direct RPC query...');
                
                try {
                    const currentBlock = await publicClient.getBlockNumber();
                    const startBlock = BigInt(ICO_START_BLOCK);
                    let fromBlock = startBlock;
                    const allRpcLogs = [];

                    while (fromBlock <= currentBlock && allRpcLogs.length < MAX_TRANSACTIONS) {
                        const toBlock = fromBlock + BigInt(BLOCK_RANGE) > currentBlock 
                            ? currentBlock 
                            : fromBlock + BigInt(BLOCK_RANGE);
                        
                        try {
                            const logs = await publicClient.getLogs({
                                address: ICO_ADDRESS as `0x${string}`,
                                event: {
                                    type: 'event',
                                    name: 'TokensPurchased',
                                    inputs: [
                                        { type: 'address', indexed: true, name: 'buyer' },
                                        { type: 'address', indexed: true, name: 'recipient' },
                                        { type: 'uint256', indexed: false, name: 'amount' }
                                    ]
                                },
                                fromBlock,
                                toBlock,
                                args: {
                                    buyer: address as `0x${string}`
                                }
                            });
                            
                            const logsAsRecipient = await publicClient.getLogs({
                                address: ICO_ADDRESS as `0x${string}`,
                                event: {
                                    type: 'event',
                                    name: 'TokensPurchased',
                                    inputs: [
                                        { type: 'address', indexed: true, name: 'buyer' },
                                        { type: 'address', indexed: true, name: 'recipient' },
                                        { type: 'uint256', indexed: false, name: 'amount' }
                                    ]
                                },
                                fromBlock,
                                toBlock,
                                args: {
                                    recipient: address as `0x${string}`
                                }
                            });
                            
                            const combinedLogs = [...logs, ...logsAsRecipient];
                            
                            for (const log of combinedLogs) {
                                const block = await publicClient.getBlock({ blockNumber: log.blockNumber });
                                allRpcLogs.push({
                                    transactionHash: log.transactionHash,
                                    blockNumber: log.blockNumber.toString(),
                                    timeStamp: block.timestamp.toString(),
                                    data: log.data,
                                    topics: log.topics
                                });
                            }
                            
                            console.log(`RPC: Fetched ${combinedLogs.length} logs from block ${fromBlock} to ${toBlock}`);
                        } catch (rpcError) {
                            console.warn(`RPC failed for range ${fromBlock}-${toBlock}:`, rpcError);
                        }
                        
                        fromBlock = toBlock + BigInt(1);
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                    
                    const uniqueRpcLogs = new Map();
                    allRpcLogs.forEach((log: any) => {
                        if (!uniqueRpcLogs.has(log.transactionHash)) {
                            uniqueRpcLogs.set(log.transactionHash, log);
                        }
                    });
                    
                    uniqueLogs = Array.from(uniqueRpcLogs.values());
                    console.log(`RPC fallback completed: ${uniqueLogs.length} transactions found`);
                } catch (rpcError) {
                    console.error('RPC fallback also failed:', rpcError);
                    throw new Error('Both BscScan API and RPC fallback failed');
                }
            }
            
            uniqueLogs.sort((a: any, b: any) => parseInt(b.timeStamp) - parseInt(a.timeStamp));

            const formattedTxs: Transaction[] = uniqueLogs.slice(0, MAX_TRANSACTIONS).map((log: any) => {
                const timestamp = parseInt(log.timeStamp);
                const date = new Date(timestamp * 1000).toLocaleString();

                try {
                    const decodedLog = decodeEventLog({
                        abi: StoneformICOABI,
                        data: log.data as `0x${string}`,
                        topics: log.topics as [`0x${string}`, ...`0x${string}`[]]
                    });

                    const args = decodedLog.args as any;
                    const amount = formatUnits(args.amount || BigInt(0), 18);
                    
                    const usdValue = tokenPrice > 0 ? (parseFloat(amount) * tokenPrice) : 0;

                    return {
                        id: log.transactionHash,
                        type: 'buy',
                        amount: parseFloat(amount).toFixed(2),
                        tokenSymbol: 'STOF',
                        cost: usdValue > 0 ? usdValue.toFixed(2) : '-',
                        costSymbol: '$',
                        paymentToken: '0x0',
                        paymentAmount: '0',
                        date: date,
                        timestamp: timestamp,
                        status: 'completed',
                        hash: log.transactionHash,
                        blockNumber: BigInt(log.blockNumber)
                    };
                } catch (decodeError) {
                    console.warn('Failed to decode log:', decodeError);
                    return null;
                }
            }).filter((tx): tx is Transaction => tx !== null);

            console.log(`Successfully formatted ${formattedTxs.length} transactions`);
            setTransactions(formattedTxs);
        } catch (error) {
            console.error("Failed to fetch transaction history:", error);
            setError(error instanceof Error ? error.message : 'Failed to load transactions');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [address, paymentTokenMap]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    if (!address) return null;

    return (
        <div className="w-full mt-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Transaction History
                    <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {transactions.length > 0 ? transactions.length : 'Recent'}
                    </span>
                </h3>
                <button
                    onClick={() => fetchHistory(true)}
                    disabled={isRefreshing || isLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-cyan/10 border border-stone-cyan/20 text-stone-cyan hover:bg-stone-cyan/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">Refresh</span>
                </button>
            </div>

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
                                        <div className="flex items-center justify-center gap-2">
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            Loading transactions...
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8">
                                        <div className="flex items-center justify-center gap-2 text-red-400">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{error}</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {!isLoading && !error && transactions.length === 0 && (
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
                                            <span className="text-white font-medium">{tx.cost} {tx.costSymbol}</span>
                                            <span className="text-[10px] text-gray-500">Payment Token</span>
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
