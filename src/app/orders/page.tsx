"use client"

import {createClient} from "@/utils/supabase/client";
import {useEffect} from "react";

async function getOrders() {
    const supabase = createClient()

    const {data,error} = await supabase.auth.getUser()

    if(error){
        throw new Error(error.message);
    }
    const {data: orders, error: orderError} = await supabase.from('orders').select().eq('user_id',data?.user?.id)

    console.log(data)
    console.log(orders)

}

const OrdersPage = () => {



    useEffect(() => {
        getOrders()

    }, []);
    return (
        <section id="orders">
            <p>Orders</p>
        </section>
    )
}

export default OrdersPage