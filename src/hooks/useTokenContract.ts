import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi } from 'viem';

export const useTokenContract = (tokenAddress: `0x${string}`) => {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const getBalance = (address: `0x${string}`) => {
        return useReadContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
        });
    };

    const getAllowance = (owner: `0x${string}`, spender: `0x${string}`) => {
        return useReadContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [owner, spender],
        });
    };

    const approve = (spender: `0x${string}`, amount: bigint) => {
        writeContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'approve',
            args: [spender, amount],
        });
    };

    return {
        getBalance,
        getAllowance,
        approve,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
        error
    };
};
