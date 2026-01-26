import React, { useEffect, useState } from 'react';
import { Check, X, Loader2, ExternalLink, Copy } from 'lucide-react';
import Button from './Button';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: 'success' | 'error' | 'loading' | null;
    title?: string;
    message?: string;
    txHash?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
    isOpen,
    onClose,
    status,
    title,
    message,
    txHash,
    actionLabel,
    onAction
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsMounted(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isMounted) return null;

    const renderIcon = () => {
        switch (status) {
            case 'success':
                return (
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                );
            case 'error':
                return (
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                        <X className="w-10 h-10 text-red-500" />
                    </div>
                );
            case 'loading':
                return (
                    <div className="w-20 h-20 rounded-full bg-stone-cyan/10 border border-stone-cyan/20 flex items-center justify-center mb-6">
                        <Loader2 className="w-10 h-10 text-stone-cyan animate-spin" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center px-4 min-h-screen transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={status !== 'loading' ? onClose : undefined}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-md bg-stone-dark border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
            >
                {status !== 'loading' && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="flex flex-col items-center text-center">
                    {renderIcon()}

                    <h3 className="text-2xl font-bold text-white mb-2">
                        {title || (status === 'success' ? 'Transaction Successful' : status === 'error' ? 'Transaction Failed' : 'Processing...')}
                    </h3>

                    <p className="text-gray-400 mb-8 max-w-xs">
                        {message || (status === 'success'
                            ? 'Your transaction has been confirmed on the blockchain.'
                            : status === 'error'
                                ? 'Something went wrong with your transaction. Please try again.'
                                : 'Please wait while we process your transaction.')}
                    </p>

                    {txHash && (
                        <div className="w-full bg-black/20 rounded-2xl p-4 mb-8 border border-white/5 flex flex-col gap-2">
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Transaction Hash</span>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-mono text-gray-300 truncate">{txHash}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(txHash);
                                            // Toast logic could go here if available globally
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-stone-cyan transition-colors"
                                        title="Copy Hash"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={`https://bscscan.com/tx/${txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-stone-cyan transition-colors"
                                        title="View on Explorer"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full space-y-3">
                        {status !== 'loading' && (
                            <Button
                                variant="primary"
                                onClick={onAction || onClose}
                                className="w-full !h-14 !text-lg"
                            >
                                {actionLabel || (status === 'success' ? 'Great!' : 'Close')}
                            </Button>
                        )}

                        {(status === 'success' || status === 'error') && !onAction && (
                            <button
                                onClick={onClose}
                                className="text-sm text-gray-500 hover:text-white font-medium transition-colors"
                            >
                                Dismiss
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;
