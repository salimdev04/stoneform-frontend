"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname === "/dashboard";
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    const handleExplore = () => {
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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-[2000px] mx-auto">
            <Link href={"/"} className="flex items-center gap-2">
                <Image
                    src="/StoneformLogo.png"
                    alt="StoneForm"
                    width={100}
                    height={100}
                    className="object-contain w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]"
                />
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                {!isDashboard && (
                    <Button
                        variant="primary"
                        onClick={handleExplore}
                        className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto sm:w-[160px] h-[40px] sm:h-[50px]"
                    >
                        Explore
                    </Button>
                )}
                <Button variant="secondary" className="!py-2 !px-4 !text-sm sm:!py-[8px] sm:!px-[24px] sm:!text-[21px] w-auto sm:w-[160px] h-[40px] sm:h-[50px]">
                    Contact
                </Button>
            </div>
        </nav>
    );
}
