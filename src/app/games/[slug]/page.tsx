import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {IProduct} from "@/utils/interface/product";
import {Metadata} from "next";
import {ProductCard} from "@/app/components/Card";
import {Suspense} from "react";


async function getGameDetails(slug: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const {data: product} = await supabase.from('games').select('*').eq('id', slug)

    if (product != null) {
        return product[0]
    }
    return null;
}

async function getSuggestedGamesByGenre(genre: string, id: number) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const {data: games} = await supabase.from('games').select('*').eq('genre', genre).neq('id', id);

    if (games != null) {
        return games;
    }
    return null;
}

export const metadata: Metadata = {
    title: "Games",
    description: "PS5 game"
}

const Game = async ({params}: {
    params: Promise<{ slug: string }>
}) => {
    const {slug} = await params
    const game: IProduct | null = await getGameDetails(slug)
    console.log(game)

    const suggestedGames = game ? await getSuggestedGamesByGenre(game?.genre, game?.id) : []

    console.log(suggestedGames)
    return (
        <div className="w-full flex flex-col items-center p-5">
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
                        <button className="bg-amber-700 text-white p-3 hover:bg-amber-600 hover:cursor-pointer">Add to
                            Cart
                        </button>

                    </div>
                </div>

            </div>

            <div className="p-3">
                <h1 className="text-2xl text-center" >You might also like! </h1>
                <div className="flex  ">
                    <Suspense fallback={<div>Looking for suggestions..</div>}>
                        {suggestedGames?.map((game: IProduct) => (
                            <ProductCard product={game} key={game.id}/>

                        ))}
                    </Suspense>
                </div>
            </div>

        </div>
    )
}

export default Game;