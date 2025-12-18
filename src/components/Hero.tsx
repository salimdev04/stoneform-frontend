"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

export default function Hero() {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname === "/dashboard";
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    const handleInvestNow = () => {
        if (isConnected) {
            router.push("/dashboard");
        } else {
            openConnectModal?.();
        }
    };

    useEffect(() => {
        if (isConnected && pathname === "/") {
            router.push("/dashboard");
        }
    }, [isConnected, pathname, router]);

    const dashboardButtons = [
        { label: "View Portfolio", href: "/portfolio" },
        { label: "Invest", href: "/invest" },
        { label: "Withdraw Funds", href: "/portfolio" },
        { label: "Transaction History", href: "/transactions" },
        { label: "Account Settings", href: "/settings" },
    ];

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {
                    isDashboard ? (
                        <>
                            {/* Mobile Dashboard Background */}
                            <div className="block md:hidden w-full h-full relative">
                                <Image
                                    src="/StoneformIPPhoneView.png"
                                    alt="Dashboard Mobile Background"
                                    className="object-cover"
                                    fill
                                    quality={100}
                                    priority
                                />
                            </div>
                            {/* Desktop Dashboard Background */}
                            <div className="hidden md:block w-full h-full relative">
                                <Image
                                    src="/StoneformIPBackground.png"
                                    alt="Dashboard Desktop Background"
                                    className="object-cover"
                                    fill
                                    quality={100}
                                    priority
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Mobile Hero Background */}
                            <div className="block md:hidden w-full h-full relative">
                                <Image
                                    src="/StoneformLPPhoneView.png"
                                    alt="Hero Mobile Background"
                                    className="object-cover"
                                    fill
                                    quality={100}
                                    priority
                                />
                            </div>
                            {/* Desktop Hero Background */}
                            <div className="hidden md:block w-full h-full relative">
                                <Image
                                    src="/StoneformLPBackground.png"
                                    alt="Hero Desktop Background"
                                    className="object-cover"
                                    fill
                                    quality={100}
                                    priority
                                />
                            </div>
                        </>
                    )
                }
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mx-auto md:mt-[150px]">
                <div className="flex items-center justify-center gap-1 sm:gap-4 mb-4 select-none animate-fade-in-up">
                    <Image src="/stoneform-logo.svg" alt="Stoneform" width={830} height={160} />
                </div>

                {isDashboard ? (
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-16 w-full max-w-4xl lg:max-w-none px-4">
                        {dashboardButtons.map((btn) => (
                            <Button key={btn.label} className="text-base sm:text-lg">
                                <Link href={btn.href}>{btn.label}</Link>
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Button
                        onClick={handleInvestNow}
                        className="text-2xl px-14 py-3 md:mt-24 mt-12"
                    >
                        Invest Now
                    </Button>
                )}
            </div>
        </section>
    );
}
