"use client"
import {IProduct} from "@/utils/interface/product";
import useAppStore from "../../../store";

const DetailCard = (props: { game: IProduct | null; }) => {
    const {game} = props;

    const {product, addProduct} = useAppStore()
    return (
        <div className="flex gap-10 flex-wrap p-5 my-5 bg-white w-1/2">

            <div className="w-1/4">
                <img src={game?.thumbnail} alt="Thumbnail image"/>
            </div>
            <div className="text-black font-semibold w-2/3">
                <h1 className="text-3xl font-bold py-3">{game?.name}</h1>
                <h2 className="text-xl py-3">Genre: {game?.genre}</h2>
                <h2 className="text-xl py-3">Year: {game?.year}</h2>
                <h1 className="font-bold text-4xl py-3">${game?.price}</h1>
                <div className="flex justify-end ">
                    <button className="bg-amber-700 text-white p-3 hover:bg-amber-600 hover:cursor-pointer"
                    onClick={() => addProduct(game)}>Add to
                        Cart
                    </button>

                </div>
            </div>

        </div>
    )
}

export default DetailCard;