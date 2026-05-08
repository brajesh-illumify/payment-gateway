export type PaymentStatus = "completed" | "failed";

export type PaymentRecord = {
    id: string;
    status: PaymentStatus;
    amount: number;
    currency: string;
    cardLast4: string;
    cardHolderName: string;
    createdAt: string;
    message?: string;
};

const STORAGE_KEY = "payment-history";

export const getPaymentHistory = (): PaymentRecord[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as PaymentRecord[]) : [];
    } catch {
        return [];
    }
};

export const savePaymentRecord = (record: PaymentRecord): void => {
    if (typeof window === "undefined") return;
    try {
        const existing = getPaymentHistory();
        const next = [record, ...existing.filter((r) => r.id !== record.id)];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
        console.error("Error saving payment record", error);
    }
};
