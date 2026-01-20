import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";
import Login from "@/app/components/Login";
import {ProductCard} from "@/app/components/Card";
import {IProduct} from "@/utils/interface/product";

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

export default async function Home() {

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const {data: products} = await supabase.from('games').select();
// console.log(todos);


    return (
        <div>

            <div className="flex justify-between items-center gap-10 flex-wrap p-5">

            {products?.map((product: IProduct) => (
                <ProductCard product={product} key={product.id} />
            ))}

            </div>


            {/*<button onClick={() => signUpNewUser()}>Send sign up</button>*/}
            <Login call={signUpNewUser} />
        </div>
  );
}

