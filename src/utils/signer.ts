import { encodePacked, keccak256, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

/**
 * Generates the signature required by the Stoneform ICO contract.
 * CAUTION: This requires a private key. In production, this MUST be done server-side.
 * Using this on the frontend exposes the private key if not carefully handled (e.g., local dev only).
 */
export const generateSignature = async (
    paymentType: number,
    recipient: string, // Address receiving tokens
    caller: string,    // Address calling buyToken (msg.sender)
    amount: bigint,    // Amount of tokens paid (or value)
    nonce: bigint,     // Unique nonce
    signerPrivateKey: `0x${string}`
) => {
    // 1. Replicate Solidity's keccak256(abi.encodePacked(assetType, recipient, caller, amount, sign.nonce))
    const encoded = encodePacked(
        ['uint256', 'address', 'address', 'uint256', 'uint256'],
        [BigInt(paymentType), recipient as `0x${string}`, caller as `0x${string}`, amount, nonce]
    );

    const hash = keccak256(encoded);

    // 2. Sign the hash
    // Solidity: signer == ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)), ...)
    // Viem signMessage automatically applies the prefix and hashes again.
    // We pass the raw bytes of our custom hash as the message.
    const account = privateKeyToAccount(signerPrivateKey);
    const signature = await account.signMessage({
        message: { raw: toBytes(hash) }
    });

    // 3. Extract v, r, s from the signature
    // Viem signature is a hex string (r + s + v)
    // r: 32 bytes, s: 32 bytes, v: 1 byte
    const r = signature.slice(0, 66) as `0x${string}`;
    const s = ('0x' + signature.slice(66, 130)) as `0x${string}`;
    const v = parseInt(signature.slice(130, 132), 16);

    return { v, r, s, nonce };
};
