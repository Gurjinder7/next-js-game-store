import {NextRequest, NextResponse} from 'next/server'
import {cookies, headers} from 'next/headers'

import {stripe} from "@/utils/Stripe/stripe";
import {createClient} from "@/utils/supabase/server";
import {IProduct} from "@/utils/interface/product";
import { ErrorResponse } from "@/utils/interface/types"


// const product = await stripe.products.create({
//     name: 'T-shirt',
// });
//
// const price = await stripe.prices.create({
//     product: '{{PRODUCT_ID}}',
//     unit_amount: 2000,
//     currency: 'usd',
// });

const getCartItems = async(cartId: string) => {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    console.log(cartId)
    const { data:cartItems, error } = await supabase.from('cart_item').select('game_id')
        .eq('cart_id', cartId)

    console.log(cartItems)
    if(cartItems) {

    const {data: games} = await supabase.from('games').select()
        .in('id', cartItems.map(cartItem => cartItem.game_id))

    console.log(games)

        return games as IProduct[]
    }
    return []

}

export async function POST(req: NextRequest) {

    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        let lineItems: IProduct[] = []
        let cartId = null
        // console.log(req)
        try {
            const body = await req.text()
            console.log(body)
            cartId = body.substring(body.indexOf('=')+1,body.length)
            lineItems = await getCartItems(cartId)

        } catch (err) {
            console.log(err)
        }
        // console.log('headereeee',origin)

        // Create Checkout Sessions from body params.

        const finalItems = lineItems.map(item => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Convert to cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: finalItems,
            //     [
            //
            //     {
            //         price_data: {
            //             currency: 'gbp',
            //             product_data: {
            //                 name: 'T-shirt',
            //             },
            //             unit_amount: 2000,
            //         },
            //         quantity: 1,
            //     },
            // ],
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&cart=${cartId}`,
            customer_email: 'dev.gurjinder@gmail.com'
        });
        return NextResponse.redirect(session.url ? session.url: "", 303)
    } catch (err: unknown) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}