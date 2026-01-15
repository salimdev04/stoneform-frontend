import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

const DappNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const isActive = (path: string) => router.pathname === path;

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Invest Now', href: '/invest' },
        { name: "Whitepaper", href: "/WhitepaperV4.pdf" },
        { name: 'Contact', href: 'mailto:contact@stoneform.io' }, // Assuming contact is mailto or a page, user didn't specify page
    ];

    return (
        <nav className="fixed top-0 w-full z-50 
        bg-stone-dark backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-50">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <Image
                            src="/stoneform-text-logo.gif"
                            alt="StoneForm"
                            width={160}
                            height={80}
                            className="h-40 w-auto object-contain mix-blend-screen md:-ml-10"
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                    ? 'text-stone-cyan'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-stone-dark border-t border-white/5 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href)
                                    ? 'text-stone-cyan bg-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DappNavbar;
