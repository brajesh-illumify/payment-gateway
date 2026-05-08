"use client";
import { useEffect, useState } from "react";

import { Card } from "@/src/components/card";
import { getPaymentHistory, type PaymentRecord } from "../../lib/storage";

const formatDateTime = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatAmount = (amount: number, currency: string): string => {
    const isoCurrency = currency === "IND" ? "INR" : currency;
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: isoCurrency,
        }).format(amount);
    } catch {
        return `${amount} ${currency}`;
    }
};

export default function PaymentHistoryPage() {
    const [records, setRecords] = useState<PaymentRecord[] | null>(null);

    useEffect(() => {
        setRecords(getPaymentHistory());
    }, []);

    return (
        <Card className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
                {records && records.length > 0 && (
                    <span className="text-xs text-gray-500">{records.length} transactions</span>
                )}
            </div>

            {records === null && (
                <p className="text-sm text-gray-500">Loading...</p>
            )}

            {records && records.length === 0 && (
                <p className="text-sm text-gray-500">
                    No transactions yet. Make a payment and it will appear here.
                </p>
            )}

            {records && records.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                                <th className="py-2 pr-3 font-semibold">Transaction ID</th>
                                <th className="py-2 pr-3 font-semibold">Date &amp; Time</th>
                                <th className="py-2 pr-3 font-semibold">Cardholder</th>
                                <th className="py-2 pr-3 font-semibold">Card</th>
                                <th className="py-2 pr-3 text-right font-semibold">Amount</th>
                                <th className="py-2 pr-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id} className="border-b border-gray-100 last:border-0">
                                    <td className="py-3 pr-3 font-mono text-xs text-gray-700" title={record.id}>
                                        {record.id.slice(0, 8)}...
                                    </td>
                                    <td className="py-3 pr-3 text-gray-700">{formatDateTime(record.createdAt)}</td>
                                    <td className="py-3 pr-3 text-gray-700">{record.cardHolderName}</td>
                                    <td className="py-3 pr-3 font-mono text-gray-700">**** {record.cardLast4}</td>
                                    <td className="py-3 pr-3 text-right font-semibold text-gray-900">
                                        {formatAmount(record.amount, record.currency)}
                                    </td>
                                    <td className="py-3 pr-3">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                record.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {record.status === "completed" ? "Success" : "Failed"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}
