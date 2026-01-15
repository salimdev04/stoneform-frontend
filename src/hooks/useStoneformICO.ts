import { useReadContract } from 'wagmi';
import StoneformICOABI from '../ABI/StoneformICO.json';

const ICO_ADDRESS = process.env.NEXT_PUBLIC_STONEFORM_ICO_ADDRESS as `0x${string}`;

export const useStoneformICO = () => {
    // Helper to get formatted payment type
    // Assuming 0 = BNB, 1 = USDT, 2 = USDC based on typical patterns, 
    // but in ABI `paymentDetails` takes uint256. 
    // We will expose a generic reader.

    const useGetPaymentDetails = (paymentType: number) => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'paymentDetails',
            args: [BigInt(paymentType)],
        });
    };

    const useGetLatestPrice = (paymentType: number) => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'getLatestPrice',
            args: [BigInt(paymentType)],
        });
    };

    const useGetTokenAmountPerUSD = () => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'tokenAmountPerUSD',
        });
    };

    const useGetTokenAddress = () => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'tokenAddress',
        });
    };

    // Note: Total Raised is not directly available in standard view functions of this ABI.
    // We might need to listen to events or use an indexing service later.
    // For now we will rely on what is available.

    return {
        useGetPaymentDetails,
        useGetLatestPrice,
        useGetTokenAmountPerUSD,
        useGetTokenAddress,
        ICO_ADDRESS
    };
};
