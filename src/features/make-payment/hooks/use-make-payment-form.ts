"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Resolver } from "react-hook-form"

import { useToastStore } from "@/src/store/snackbar-slice"
import { savePaymentRecord } from "@/src/lib/storage"

import { makePaymentSchema, MakePaymentFormType } from "../schema"
import { useState } from "react"

export const useMakePaymentForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const toast = useToastStore((state) => state.toast)

    const form = useForm<MakePaymentFormType>({
        defaultValues: {
            currency: "IND",
            amount: 0,
            cardNumber: "",
            cardExpiry: "",
            cardCvv: "",
            cardHolderName: "",
        },
        resolver: zodResolver(makePaymentSchema) as Resolver<MakePaymentFormType>,
        mode: "onChange",
        reValidateMode: "onChange",
    })

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/pay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            const baseRecord = {
                amount: Number(data.amount),
                currency: data.currency,
                cardLast4: data.cardNumber.slice(-4),
                cardHolderName: data.cardHolderName,
                createdAt: new Date().toISOString(),
            };

            if (result.success) {
                savePaymentRecord({
                    ...baseRecord,
                    id: result.transactionId,
                    status: "completed",
                });
                toast.open("Payment successful", "success");
                form.reset();
            } else {
                savePaymentRecord({
                    ...baseRecord,
                    id: crypto.randomUUID(),
                    status: "failed",
                    message: result.message,
                });
                toast.open("Payment failed", "error");
            }
        } catch (error) {
            toast.open("Payment error", "error");
        } finally {
            setIsLoading(false)
        }
    })

    return {
        form,
        onSubmit,
        isLoading
    }
}