"use client"
import Link from "next/link";
import { FormProvider, useWatch } from "react-hook-form"

import { Card } from "@/src/components/card";
import { Button } from "@/src/components/button";
import { FormTextField } from "@/src/components/form/form-text-field";
import { FormSelect } from "@/src/components/form/form-select";
import { formatCardNumber } from "@/src/utils/format-card-number"
import { formatCardDate } from "@/src/utils/format-card-date"
import { formatCvvNumber } from "@/src/utils/format-cvv-number"
import { withNumericKeyDown } from "@/src/utils/with-numeric-key-down";
import { Loader } from "@/src/components/loader";

import { useMakePaymentForm } from "./hooks/use-make-payment-form"


export default function MakePaymentPage() {

    const { form, onSubmit, isLoading } = useMakePaymentForm();

    const cardNumber = useWatch({
        control: form.control,
        name: "cardNumber"
    })
    const cardExpiry = useWatch({
        control: form.control,
        name: "cardExpiry"
    })
    const cardCvv = useWatch({
        control: form.control,
        name: "cardCvv"
    })

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 16);
        form.setValue("cardNumber", value);
    }

    const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
        form.setValue("cardCvv", value);
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit} className="w-1/3">
                <Card className="space-y-2 w-1/2">
                    <h1 className="text-2xl font-bold text-center text-blue-700">Payment Gateway</h1>
                    <div className="flex justify-center w-full">
                        <img src="/payment-card.png" alt="card" height={"120px"} width={"120px"} className="object-contain bg-white" />
                    </div>
                    <FormTextField
                        label="Card Holder Name"
                        placeholder="Enter Card Holder Name"
                        name="cardHolderName"
                        id="cardHolderName"
                        type="text"
                    />
                    <FormTextField
                        label="Card Number"
                        placeholder="e.g. 1234 2345 3456 4567"
                        name="cardNumber"
                        id="cardNumber"
                        inputMode="numeric"
                        maxLength={19}
                        value={formatCardNumber(cardNumber)}
                        onChange={handleCardNumberChange}
                    />
                    <FormTextField
                        label="Card Expiry"
                        placeholder="MM/YY"
                        name="cardExpiry"
                        id="cardExpiry"
                        inputMode="numeric"
                        maxLength={5}
                        value={formatCardDate(cardExpiry)}
                    />
                    <FormTextField
                        label="Card CVV"
                        placeholder="CVV"
                        name="cardCvv"
                        id="cardCvv"
                        inputMode="numeric"
                        maxLength={3}
                        value={formatCvvNumber(cardCvv)}
                        onChange={handleCardCvvChange}
                    />
                    <div className="flex justify-between gap-1">
                        <FormSelect
                            label="Currency"
                            name="currency"
                            id="currency"
                            options={[{ label: "USD", value: "USD" }, { label: "IND", value: "IND" }]}
                        />
                        <FormTextField
                            label="Amount"
                            placeholder="Enter Amount"
                            name="amount"
                            id="amount"
                            inputMode="decimal"
                            onKeyDown={withNumericKeyDown}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading} style={{ height: "40px" }}>
                        {isLoading ? <Loader className="size-4" /> : "Make Payment"}
                    </Button>
                    <Link
                        href="/payment-history"
                        className="block text-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        View Payment History
                    </Link>
                </Card>
            </form>
        </FormProvider>
    )
}