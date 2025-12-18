import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
    LayoutDashboard,
    TrendingUp,
    PieChart,
    History,
    Settings,
    Menu,
    X,
    LogOut,
    User
} from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Invest", href: "/invest", icon: TrendingUp },
        { name: "Portfolio", href: "/portfolio", icon: PieChart },
        { name: "Transactions", href: "/transactions", icon: History },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = () => {
        disconnect();
        router.push("/");
    };

    const formatAddress = (addr: string | undefined) => {
        if (!addr) return "Not Connected";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-stone-dark flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#000d4d] border-r border-white/5 fixed h-full z-30">
                <div className="p-6 flex items-center justify-center">
                    <Link href="/">
                        <Image
                            src="/StoneformLogo.png"
                            alt="StoneForm"
                            width={150}
                            height={150}
                            className="w-[100px] h-auto object-contain"
                        />
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const isActive = router.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive
                                    ? "bg-stone-violet/20 text-stone-purple font-semibold"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                            <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">
                                {isConnected ? formatAddress(address) : "Guest"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {isConnected ? "Connected via Wallet" : "Not Connected"}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#000d4d] z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="p-6 flex items-center justify-between">
                    <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
                        <Image
                            src="/StoneformLogo.png"
                            alt="StoneForm"
                            width={120}
                            height={120}
                            className="w-[80px] h-auto object-contain"
                        />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                        <X size={24} />
                    </button>
                </div>
                <nav className="px-4 py-2 space-y-2">
                    {navigation.map((item) => {
                        const isActive = router.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive
                                    ? "bg-stone-violet/20 text-stone-purple font-semibold"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                            <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">
                                {isConnected ? formatAddress(address) : "Guest"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {isConnected ? "Connected via Wallet" : "Not Connected"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
                {/* Topbar Mobile */}
                <header className="bg-[#000d4d] border-b border-white/5 h-16 flex items-center justify-between px-4 lg:hidden sticky top-0 z-20">
                    <button onClick={toggleSidebar} className="text-white">
                        <Menu size={24} />
                    </button>
                    <Link href="/dashboard">
                        <Image
                            src="/StoneformLogo.png"
                            alt="StoneForm"
                            width={40}
                            height={40}
                            className="w-8 h-8 object-contain"
                        />
                    </Link>
                    <div className="w-8" /> {/* Spacer for centering */}
                </header>

                <main className="p-4 sm:p-8 max-w-[1600px] mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
