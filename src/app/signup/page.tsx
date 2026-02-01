"use client"
import Link from "next/link";
import {createClient} from "@/utils/supabase/client";
import {useActionState, useEffect} from "react";
import useAppStore from "../../../store";
import {useRouter} from "next/navigation";


interface FormState {
    success: boolean;
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

const initialState = {
    success: false,
    name: null,
    email: null,
    password: null,
}

async function handleSubmit(formState: FormState) {
    const supabase = await createClient()

    if (formState.success) {
        const {data, error} = await supabase.auth.signUp({
            email: formState.email ? formState.email.toString(): '',
            password: formState.password ? formState.password?.toString() : '',
            options: {
                data: {
                    display_name: formState.name
                }
            }

        })

        console.log(data)

        return data ? data : error
    }


}

function submitForm(prevState: FormState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    console.log(prevState)
    // console.log(username, password);

    if(!email || !password || !name) {
        return {
            success: false,
            name: null,
            email: null,
            password: null,
        }
    }

    return {
        success: true,
        email,
        password,
        name

    }

}

const Signup = () => {
    const { authenticated, setAuthenticated, setUser, products, toggleLoginDialog } = useAppStore()
    const router = useRouter()

    const [state, formAction, isPending] = useActionState(submitForm, initialState);


    useEffect(() => {
        if(state.success) {
            handleSubmit(state).then(res => {
                console.log(res)
                setAuthenticated(true)
                setUser(res)

                if(products.length > 0) {
                    router.push("/cart")
                } else {
                    router.push("/")
                }
            }).catch(err => console.log(err))

        }
    },[state])

    useEffect(() => {
        toggleLoginDialog(false)
    }, []);
    return (
        <div className="p-5 flex justify-center items-center">
            <form action={formAction} className="flex flex-col items-center h-1/2 w-1/3 border border-gray-300 p-3 shadow-lg relative">

                <h2 className="text-3xl text-center mb-5 mt-8">Sign up now!</h2>

                <input type="text" placeholder="Name" name="name" minLength={3} className="py-2 px-3 w-full my-3 border border-gray-300" required/>
                <input type="text" placeholder="Email" name="email"  required minLength={9} pattern="^\S+@\S+\.\S+$" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <input type="password" placeholder="Password" name="password" minLength={6} required className="py-2 px-3 w-full my-3 border border-gray-300" />
                <button  type="submit" className="p-3 w-1/4 bg-violet-500 hover:bg-violet-700 hover:cursor-pointer text-white">Signup</button>

            </form>
        </div>
    )
}

export default Signup;