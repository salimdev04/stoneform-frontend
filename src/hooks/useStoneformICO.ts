import { useReadContract } from 'wagmi';
import StoneformICOABI from '../ABI/StoneformICO.json';

const ICO_ADDRESS = process.env.NEXT_PUBLIC_STONEFORM_ICO_ADDRESS as `0x${string}`;

export const useStoneformICO = () => {
    // Helper to get formatted payment type
    // Assuming 0 = BNB, 1 = USDT, 2 = USDC based on typical patterns, 
    // but in ABI `paymentDetails` takes uint256. 
    // We will expose a generic reader.

    const getPaymentDetails = (paymentType: number) => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'paymentDetails',
            args: [BigInt(paymentType)],
        });
    };

    const getLatestPrice = (paymentType: number) => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'getLatestPrice',
            args: [BigInt(paymentType)],
        });
    };

    const getTokenAmountPerUSD = () => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'tokenAmountPerUSD',
        });
    };

    // Note: Total Raised is not directly available in standard view functions of this ABI.
    // We might need to listen to events or use an indexing service later.
    // For now we will rely on what is available.

    return {
        getPaymentDetails,
        getLatestPrice,
        getTokenAmountPerUSD,
        ICO_ADDRESS
    };
};
