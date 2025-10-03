"use client";

import { ArrowLeft, Hammer, Mail, Wrench } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="relative min-h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
                {/* subtle decorative blobs */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-100 opacity-60 blur-3xl" />

                <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    {/* Icon header */}
                    <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-indigo-50 p-4">
                        <Wrench className="h-8 w-8 text-indigo-600" />
                    </div>

                    <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        This page is under development
                    </h1>
                    <p className="mt-3 max-w-2xl text-center text-sm leading-6 text-gray-600 sm:text-base">
                        We’re crafting something great here. Check back soon—meanwhile, you can explore other sections
                        or reach out if you need help.
                    </p>

                    {/* Card */}
                    <div className="mt-8 w-full">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                                <div className="flex items-start gap-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                                        <Hammer className="h-5 w-5 text-gray-700" />
                                    </span>
                                    <div>
                                        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                                            We’re working on it
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Our team is putting the final touches on this feature to make sure it feels fast,
                                            reliable, and delightful to use.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Go to Home
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Contact Support
                                    </Link>
                                </div>
                            </div>

                            {/* Status strip */}
                            <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-6 py-4 text-xs text-gray-500 sm:px-8">
                                <div className="inline-flex items-center gap-2">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                    <span>Active development</span>
                                </div>
                                <span className="hidden sm:inline">Updated moments ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Helpful links */}
                    <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                            href="/"
                            className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Back to Dashboard</div>
                                    <div className="mt-1 text-xs text-gray-600">
                                        View stats, auctions, and quick actions.
                                    </div>
                                </div>
                                <div className="rounded-lg bg-indigo-50 p-2">
                                    <Wrench className="h-5 w-5 text-indigo-600 transition group-hover:rotate-6" />
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/help"
                            className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Help & Docs</div>
                                    <div className="mt-1 text-xs text-gray-600">
                                        Guides, FAQs, and troubleshooting.
                                    </div>
                                </div>
                                <div className="rounded-lg bg-violet-50 p-2">
                                    <Hammer className="h-5 w-5 text-violet-600 transition group-hover:-rotate-6" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Footer note */}
                    <p className="mt-10 text-center text-xs text-gray-500">
                        Thanks for your patience ❤️ We’re building this with care.
                    </p>
                </div>
            </div>
        </>
    );
}
