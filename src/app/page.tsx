import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import Login from "@/app/components/Login";
import {ProductCard} from "@/app/components/Card";
import {IProduct} from "@/utils/interface/product";
import SearchBar from "@/app/components/SearchBar";
import {Suspense, use} from "react";
import SortGames from "@/app/components/Sort";
import FilterGames from "@/app/components/Filter";

async function signUpNewUser() {
    "use server"
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signUp({
        email: 'valid.email1@supabase.io',
        password: 'example-password',

        options: {
        //     emailRedirectTo: 'https://example.com/welcome',
            data: {
                display_name: "Supabase user",
            }
        },
    })

    console.log(data)
    console.log(error)
}


async function searchGame(searchTerm: string = "Call") {
    "use server"
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    // const { data, error } = await supabase.auth.signUp({
    //     email: 'valid.email1@supabase.io',
    //     password: 'example-password',
    //
    //     options: {
    //         //     emailRedirectTo: 'https://example.com/welcome',
    //         data: {
    //             display_name: "Supabase user",
    //         }
    //     },
    // })
    const {data:products} = await supabase.from('games').select().ilike('name',`%call%`)

    console.log(products)
}
export default async function Home({searchParams}) {

    // console.log(searchParams)

    const { query: search, sortBy, sortOrder, filter } = await searchParams

    // const search = use(searchParams)
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)


    console.log(sortBy,sortOrder)
    let query = supabase.from('games')
        .select()
        .ilike('name',`%${search ? search : ''}%`)
        .order(sortBy ?? 'name', {ascending: sortOrder === 'asc' || sortOrder === undefined ? true : false})

    if (filter) {
        query.eq('genre', filter)
    }

    const {data: products} = await query
        // supabase.from('games')
        // .select()
        // .ilike('name',`%${search ? search : ''}%`)
        // .order(sortBy ?? 'name', {ascending: sortOrder === 'asc' || sortOrder === undefined ? true : false})

// console.log(search?.query);

    console.log(search)

    console.log(products)


    return (
        <div>
            <div className="flex justify-center gap-5">
                <div>
                    <SearchBar/>

                </div>
                <div className="flex justify-evenly gap-5 items-center">

                <FilterGames />
                <SortGames />
                </div>

            </div>
            <hr/>
            <div className="flex justify-between items-center gap-10 flex-wrap p-5">
                <Suspense fallback={<div>Loading...</div>}>
            {products?.map((product: IProduct) => (

                <ProductCard product={product} key={product.id} />
            ))}
                    </Suspense>

            </div>


            {/*<button onClick={() => signUpNewUser()}>Send sign up</button>*/}
            {/*<Login call={signUpNewUser} />*/}
        </div>
  );
}

