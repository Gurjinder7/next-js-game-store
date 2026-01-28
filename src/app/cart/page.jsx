"use client"
// export const metadata = {
//     title: 'Your Cart',
//     description:'cart'
// }

import useAppStore from "../../../store";
import {Activity, Suspense, useEffect, useState} from "react";
import CartItem from "../components/Cart";
import Link from "next/link";

export const CartPage = () => {
    const [total, setTotal] = useState(0);
    const {products} = useAppStore()

    useEffect(() => {
        console.log(products)
        setTotal(0)
        products.map(product => {
            // const newTotal = total + product.price;
            console.log(total)
            setTotal((prevTotal) => prevTotal + product.price);
        })
    },[products])

    const getTotal = () => {

    }
    // console.log(products)
    console.log(total)
    return (
        <div className="p-3 flex flex-col justify-center items-center">
            <div className="w-1/2 h-[50vh] overflow-auto">
                {products && products.length === 0 && (
                    <div className="text-center text-2xl flex flex-col items-center">
                        <img src="/emptyCart.png" alt=""/>
                        <p className="pl-[15%]">Your cart is empty!</p>
                    </div>
                )}
                <Suspense fallback={<div>Loading...</div>}>
                    {products.map((product) => (
                        <CartItem game={product} key={product.id} />

                    ))}
                </Suspense>
            </div>

            <h3 className="text-2xl font-semibold mt-5">Cart Details</h3>

            <div className="w-1/2 text-xl">
                <hr/>
                <p className="flex justify-between py-3">
                    <span>Total items:</span> <span> {products.length}</span>
                </p>
                <hr/>
                <p className="flex justify-between py-3">
                    <span>Total Price:</span> <span> ${total}</span>
                </p>
                <div className="flex justify-center py-3">
                    <Activity mode={products.length > 0 ? 'visible' : 'hidden' } >
                        <Link href="/checkout" className="bg-cyan-500 p-3">Go to Checkout</Link>

                    </Activity>
                </div>
            </div>

        </div>
    )
}
export default CartPage