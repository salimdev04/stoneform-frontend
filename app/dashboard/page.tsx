"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Dashboard() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-between">
            <Navbar />
            <Hero />
        </main>
    );
}
