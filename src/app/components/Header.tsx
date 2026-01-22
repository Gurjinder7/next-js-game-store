"use client"
import Link from "next/link";
import useAppStore from "../../../store";

const Header = () => {

    const {products} = useAppStore()
    return (
        <>
            <nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark h-[8vh] flex justify-between bg-cyan-900">
                <div>
                    <img width={30} height={30} src="/vercel.svg" alt="logo"/>
                </div>
                <div>
                    <Link href="/">Home</Link>
                </div>
                <div className="flex align-bottom justify-center pr-5 pt-3">
                    <span className="relative">
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