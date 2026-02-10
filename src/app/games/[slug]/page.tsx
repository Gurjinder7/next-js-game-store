import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {IProduct} from "@/utils/interface/product";
import {Metadata} from "next";
import {ProductCard} from "@/app/components/Card";
import {Suspense} from "react";
import DetailCard from "@/app/components/DetailCard";


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

            <DetailCard game={game ? game : null} />

            <div className="p-3">
                <h1 className="text-2xl text-center" >You might also like! </h1>
                <div className="flex  max-sm:flex-col">
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