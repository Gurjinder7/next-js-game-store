"use client"
import Link from "next/link";
import useAppStore from "../../../store";
import {createClient} from "@/utils/supabase/client";

async function logOut() {
    const supabase = await createClient()

        const { error } = await supabase.auth.signOut()
        console.log("Sign Out")
        console.log(error)


}

const Header = () => {

    const {products,user, toggleLoginDialog, loginDialog, authenticated} = useAppStore()
    console.log(user)

    return (
        <>
            <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark h-[8vh] flex justify-between bg-cyan-900">
                <div>
                    <img width={30} height={30} src="/vercel.svg" alt="logo"/>
                </div>
                <div className="">
                    <Link href="/">Home</Link>

                </div>
                <div className="flex align-bottom justify-center pr-5 pt-3">
                    {user?.user?.user_metadata?.display_name && <p>{user?.user?.user_metadata?.display_name}</p>}
                    {authenticated ?
                    <button className="px-5 cursor-pointer hover:bg-teal-600" onClick={() => logOut()}>Logout</button>
                    : <button className="px-5 cursor-pointer hover:bg-teal-600" onClick={() => toggleLoginDialog(!loginDialog)}>Login</button>
                    }<span className="relative">
                        {products.length > 0 && <span className=" flex justify-center items-center absolute top-[-15px] right-[-25px] rounded-full p-2 bg-amber-300 text-black font-bold w-[30px] h-[30px]">{products.length}</span>}
                    <Link href="/cart">
                        <img src="/cart.svg" width={30} height={30} alt="cart"/>
                    </Link>
                    </span>

                </div>
            </nav>
        </>
    )
}

export default Header