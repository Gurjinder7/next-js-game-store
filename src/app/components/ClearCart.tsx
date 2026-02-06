"use client"
import Link from "next/link";
import useAppStore from "../../../store";
import {useEffect} from "react";

const ClearCart = () => {

    const { clearProducts } = useAppStore()

    useEffect(() => {
       clearProducts()
    },[])

    return (
        <>
            <h1 className="text-2xl text-cyan-700 p-3 bg-cyan-100 my-2">Your order has been placed!</h1>

            <img src="/success.svg" alt="success logo" className="w-1/4 h-1/4" />
            <Link href="/orders" className="underline mt-3">Go to your orders</Link>
        </>
    )
}

export default ClearCart;