"use client"
// export const metadata = {
//     title: 'Your Cart',
//     description:'cart'
// }

import useAppStore from "../../../store";
import {Suspense} from "react";
import CartItem from "../components/Cart";

export const CartPage = () => {

    const {products} = useAppStore()

    console.log(products)
    return (
        <div className="flex p-3 justify-center items-center">
            <div>
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
            <div>

            </div>

        </div>
    )
}
export default CartPage