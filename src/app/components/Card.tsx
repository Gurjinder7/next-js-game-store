import {IProduct} from "@/utils/interface/product";

export const ProductCard = ({product}:{product:IProduct}) => {
    const {name, id, genre, price, year, thumbnail} = product;
    return (
        <div className="flex flex-col p-4 min-w-2xs max-w-3xl m-3 bg-white">
            <img src={thumbnail} className="" alt={name}/>
            <h3 className="text-2xl text-center text-black">{name}</h3>
            <p className="text-2xl font-bold text-center text-black">${price}</p>
            <button className="bg-amber-700 text-white py-2 hover:bg-amber-600 hover:cursor-pointer">Add to Cart</button>
        </div>
    )
}