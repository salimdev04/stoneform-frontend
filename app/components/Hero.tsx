"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    const dashboardButtons = [
        { label: "View Portfolio", href: "/portfolio" },
        { label: "Invest", href: "/invest" },
        { label: "Withdraw Funds", href: "/withdraw" },
        { label: "Transaction History", href: "/transactions" },
        { label: "Account Settings", href: "/settings" },
        { label: "Logout", href: "/logout" }, // Or handle logout logic
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
                            className="object-cover bg-bottom"
                            fill
                            priority
                        />
                    ) : (
                        <Image
                            src="/bg-image-2.svg"
                            alt="Hero Background"
                            className="object-cover bg-bottom"
                            fill
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
                            <Button key={btn.label} className="text-base sm:text-lg px-6 py-3 w-full max-w-[300px] sm:w-auto sm:min-w-[160px]">
                                <Link href={btn.href}>{btn.label}</Link>
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Button className="text-xl sm:text-2xl px-12 py-6 mt-8">
                        <Link href="/dashboard">Invest Now</Link>
                    </Button>
                )}
            </div>
        </section>
    );
}
