"use client"
import Link from "next/link";
import useAppStore from "../../../store";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";

// const router = useRouter();


async function logOut() {
    const supabase = await createClient()
    // const {clearData } = useAppStore()

        const { error } = await supabase.auth.signOut()
        console.log("Sign Out")
        console.log(error)
        // clearData()

    if(error) {
        return new Error(error.message)
    }
    return true

}

const Header = () => {

    const {products,user, toggleLoginDialog, loginDialog, authenticated,clearData} = useAppStore()
    const router = useRouter()

    const clearOutUser = async () => {
            const status = await logOut()

            if (typeof(status) === "boolean") {
                clearData()
                router.push("/")

            } else {
                alert(status)
            }

    }

    console.log(user)

    return (
        <>
            <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark h-[8vh] flex justify-between bg-violet-600 text-white">
                <div className="flex items-center">
                    <img width={30} height={30} src="/guinea.svg" alt="logo"/>
                </div>
                <div className="gap-5 flex text-white flex-nowrap">
                    <Link href="/" className="flex gap-2 justify-around items-center"><img className="w-1/2 h-1/2" src="/home.svg" alt="home"/> Home</Link>
                    { authenticated &&
                    <Link href="/orders" className="flex gap-2 justify-around items-center"><img className="w-1/2 h-1/2" src="/orders.svg" alt="my orders"/> My orders</Link>
                    }
                </div>
                <div className="flex items-center justify-center pr-5 pt-3">
                     <button className="px-5 cursor-pointer" onClick={() => toggleLoginDialog(!loginDialog)} title="log in to your account">
                            <img src="/user.svg" className="w-[2rem]" alt=""/>
                    </button>

                    <span className="relative">
                        {products.length > 0 && <span className=" flex justify-center items-center absolute top-[-15px] right-[-25px] rounded-full p-2 bg-amber-400 text-black font-bold w-[30px] h-[30px]">{products.length}</span>}
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