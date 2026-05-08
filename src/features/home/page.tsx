import Link from "next/link";
import Image from "next/image";

import { Card } from "@/src/components/card";

const features = [
    {
        title: "Secure",
        description: "Bank-grade encryption protects every transaction end-to-end.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
        ),
    },
    {
        title: "Fast",
        description: "Instant settlements with sub-second authorization speeds.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 9 7.5l3.75 3.75L18 6m0 0H13.5M18 6v4.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5" />
            </svg>
        ),
    },
    {
        title: "Simple",
        description: "Clean checkout flow that customers complete in seconds.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
        ),
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/payment-card.png" alt="Smart Payment Gateway" width={36} height={36} />
                    <span className="text-lg font-bold text-gray-900">Smart Pay</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link href="/payment" className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
                        Make a Payment
                    </Link>
                </div>
            </nav>

            <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
                <div className="space-y-6">
                    <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                        Smart Payment Gateway
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Accept payments,<br />the smart way.
                    </h1>
                    <p className="text-lg text-gray-600">
                        A secure, fast, and developer-friendly payment gateway built for modern businesses. Start accepting cards in minutes.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/payment" className="rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400">
                            Pay Now
                        </Link>
                        <a href="#features" className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                            Learn more
                        </a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image
                        src="/payment-card.png"
                        alt="Payment card illustration"
                        width={420}
                        height={420}
                        className="object-contain drop-shadow-xl"
                        priority
                    />
                </div>
            </section>

            <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
                <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
                    Everything you need to get paid
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature) => (
                        <Card key={feature.title} className="space-y-3">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <footer className="border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 sm:flex-row">
                    <p>&copy; {new Date().getFullYear()} Smart Payment Gateway. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-700">Privacy</a>
                        <a href="#" className="hover:text-gray-700">Terms</a>
                        <a href="#" className="hover:text-gray-700">Contact</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
