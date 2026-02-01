"use client"

import {IProduct} from "@/utils/interface/product";
import useAppStore from "../../../store";
import Link from "next/link";

export const ProductCard = ({product}:{product:IProduct}) => {
    const {name, id, genre, price, year, thumbnail} = product;

    const {products, addProduct } = useAppStore()

    const addToCart = () => {
        console.log("addToCart")
        const hasItem = products.filter((game: IProduct) => game.id === product.id)

        if (hasItem?.length) {
            alert("Already added to cart")
            return
        }
        
        addProduct(product)

    }

    console.log(products)
    return (
            <div className="flex flex-col p-4 min-w-2xs max-w-3xl m-3 bg-white border border-gray-200 shadow-lg">
                <img src={thumbnail} className="" alt={name}/>
                <h3 className="text-2xl text-center text-black">{name}</h3>
                <p className="text-2xl font-bold text-center text-black">${price}</p>
                <button className="bg-amber-700 text-white py-2 my-2 hover:bg-amber-600 hover:cursor-pointer" onClick={addToCart}>Add to Cart</button>
                <Link href={`/games/${id}`} >
                <button className="bg-cyan-700 w-full text-white py-2 hover:bg-cyan-600 hover:cursor-pointer" >See details</button>
                </Link>

            </div>


    )
}