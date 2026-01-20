import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-stone-dark text-gray-400 py-8 px-4 md:px-8 border-t border-white/10">
            <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <Link href="/disclaimer" className="hover:text-white transition-colors">
                        Legal & Disclaimers
                    </Link>
                    <span className="hidden md:inline">|</span>
                    <Link href="/WhitepaperV5.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        Whitepaper
                    </Link>
                </div>
                <div className="text-center md:text-right">
                    ©2026 STONEFORM. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
