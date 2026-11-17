import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userSession = await auth.api.getSession({
            headers: headersList,
        });

        let bodyEmail: string | undefined;
        try {
            const body = await req.json();
            bodyEmail = body?.customer?.email;
        } catch {
            // Body was empty or already read
        }

        const customerEmail = userSession?.user?.email || bodyEmail;

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1Ucf4xPgovmiivZMnf2l1dxT',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: customerEmail,
            metadata: {
                userId: userSession?.user.id || "",
            },
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
            integration_identifier: 'hireloop_web_001',
        });
        return NextResponse.json({ checkoutUrl: session.url })
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}