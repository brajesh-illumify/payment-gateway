export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { cardNumber, cardHolderName, cardExpiry, cardCvv, amount } = body;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!cardNumber || !cardCvv || !cardExpiry || !cardHolderName) {
            return Response.json(
                {
                    success: false,
                    message: "Missing payment details",
                },
                { status: 400 }
            );
        }

        const isSuccess = Math.random() > 0.3;

        if (isSuccess) {
            return Response.json(
                {
                    success: true,
                    transactionId: crypto.randomUUID(),
                    amount,
                    status: "completed",
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: false,
                message: "Payment failed",
                status: "failed",
            },
            { status: 402 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Server error",
            },
            { status: 500 }
        );
    }
}
