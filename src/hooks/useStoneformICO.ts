import { useReadContract } from 'wagmi';
import StoneformICOABI from '../ABI/StoneformICO.json';
import AggregatorV3ABI from '../ABI/AggregatorV3.json';

const ICO_ADDRESS = process.env.NEXT_PUBLIC_STONEFORM_ICO_ADDRESS as `0x${string}`;

export const useStoneformICO = () => {
    // We will expose a generic reader.

    const useGetPaymentTokens = (paymentType: number) => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'paymentTokens',
            args: [BigInt(paymentType)],
        }) as { data: [string, `0x${string}`, `0x${string}`, bigint, boolean] | undefined };
    };

    const useGetTokenPerUSD = () => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'tokenPerUSD',
        }) as { data: bigint | undefined };
    };

    const useGetSaleToken = () => {
        return useReadContract({
            address: ICO_ADDRESS,
            abi: StoneformICOABI,
            functionName: 'saleToken',
        }) as { data: `0x${string}` | undefined };
    };

    const useGetOraclePrice = (oracleAddress: `0x${string}`) => {
        return useReadContract({
            address: oracleAddress,
            abi: AggregatorV3ABI,
            functionName: 'latestRoundData',
            query: {
                enabled: !!oracleAddress && oracleAddress !== '0x0000000000000000000000000000000000000000',
            }
        }) as { data: [bigint, bigint, bigint, bigint, bigint] | undefined };
    };

    return {
        useGetPaymentTokens,
        useGetTokenPerUSD,
        useGetSaleToken,
        useGetOraclePrice,
        ICO_ADDRESS
    };
};
