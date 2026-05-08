import { z } from "zod"

export const makePaymentSchema = z.object({
    amount: z.coerce.number().refine((val) => val > 0, {
        message: "Amount must be greater than 0",
    }),
    currency: z.enum(["USD", "IND"]),
    cardNumber: z
        .string()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => val.length === 16, {
            message: "Card number must be 16 digits",
        }),
    cardExpiry: z.string().refine((val) => val.trim() !== "" && val.length === 5, {
        message: "Card expiry date is invalid. Please enter in the format MM/YY",
    }),
    cardCvv: z
        .string()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => val.length === 3, {
            message: "Card CVV must be 3 digits",
        }),
    cardHolderName: z.string().refine((val) => val.trim() !== "", {
        message: "Card holder name is required",
    }),
})

export type MakePaymentFormType = z.infer<typeof makePaymentSchema>