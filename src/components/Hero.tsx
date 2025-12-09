"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Hero() {
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    const dashboardButtons = [
        { label: "View Portfolio", href: "#" },
        { label: "Invest", href: "#" },
        { label: "Withdraw Funds", href: "#" },
        { label: "Transaction History", href: "#" },
        { label: "Account Settings", href: "#" },
        { label: "Logout", href: "#" }, // Or handle logout logic
    ];

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {
                    isDashboard ? (
                        <Image
                            src="/bg-dashboard-image.png"
                            alt="Dashboard Background"
                            className="object-cover bg-bottom blur-[0.5px]"
                            fill
                            objectFit="cover"
                            priority
                        />
                    ) : (
                        <Image
                            src="/bg-image-2.svg"
                            alt="Hero Background"
                            className="object-cover bg-bottom blur-[0.5px]"
                            fill
                            objectFit="cover"
                            priority
                        />
                    )
                }
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto mt-[-50px]">
                <div className="flex items-center justify-center gap-1 sm:gap-4 mb-16 select-none animate-fade-in-up">
                    <Image src="/stoneform-logo.svg" alt="Stoneform" width={800} height={150} />
                </div>

                {isDashboard ? (
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8 w-full max-w-4xl px-4">
                        {dashboardButtons.map((btn) => (
                            <Button key={btn.label} className="text-base sm:text-lg px-6 py-3">
                                <Link href={btn.href}>{btn.label}</Link>
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Button className="text-xl !text-red sm:text-2xl px-12 py-6 mt-8">
                        <Link href="/dashboard">Invest Now</Link>
                    </Button>
                )}
            </div>
        </section>
    );
}
