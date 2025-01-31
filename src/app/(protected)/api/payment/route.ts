import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({
                status: 404,
                message: 'User not found',
            });
        }

        const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
        const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

        if (!priceId) {
            return NextResponse.json({
                status: 500,
                message: 'Price ID not configured',
            });
        }

        if (!hostUrl) {
            return NextResponse.json({
                status: 500,
                message: 'Host URL not configured',
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${hostUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${hostUrl}/payment?cancel=true`,
        });

        if (!session.url) {
            throw new Error('Failed to create a valid session URL');
        }

        return NextResponse.json({
            status: 200,
            session_url: session.url,
        });
    } catch (error: any) {
        console.error('Error creating Stripe session:', error);
        return NextResponse.json({
            status: 500,
            message: error.message || 'Internal Server Error',
        });
    }
}
