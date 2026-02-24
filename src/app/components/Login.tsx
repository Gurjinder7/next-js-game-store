"use client"

import {useActionState, useEffect} from "react";
import useAppStore from "../../../store";
import {createClient} from "@/utils/supabase/client";
import Link from "next/link";
import {useRouter} from "next/navigation";


interface FormState {
    success: boolean;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

const initialState = {
    success: false,
    email: null,
    password: null,
}

async function logOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()
    console.log("Sign Out")
    console.log(error)

    if(error) {
        return new Error(error.message)
    }
    return true

}

async function handleSubmit(formState: FormState) {
    const supabase = await createClient()

    if (formState.success) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: formState.email ? formState.email.toString(): '',
            password: formState.password ? formState.password?.toString() : '',
        })

        console.log(data)

        return data ? data : error
    }


}

function submitForm(prevState: FormState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(prevState)

    if(!email || !password ) {
        return {
            success: false,
            email: null,
            password: null,
        }
    }

    return {
        success: true,
        email,
        password

    }

}

const LoginDialog =  () => {

    const router = useRouter()

    const { toggleLoginDialog, authenticated, setAuthenticated, setUser, clearData, user } = useAppStore()
    const [state, formAction, isPending] = useActionState(submitForm, initialState);

    useEffect(() => {
        if(state.success) {
            handleSubmit(state).then(res => {
                   console.log(res)
                    setAuthenticated(true)
                    setUser(res)
                    toggleLoginDialog(false)

               }).catch(err => console.log(err))

        }
    },[state])

    const clearOutUser = async () => {
        const status = await logOut()

        if (typeof(status) === "boolean") {
            clearData()
            router.push("/")

        } else {
            alert(status)
        }

    }

    console.log(state)
    return (
        <article className="fixed h-[100vh] w-[100vw] top-0 p-5 flex flex-col justify-center items-center bg-violet-100">
            {
                authenticated ?
                    <section className="flex flex-col items-center max-sm:w-full max-sm:h-4/5 sm:h-1/2 sm:w-1/3 border bg-white border-gray-300 p-3 shadow-2xl relative">
                        <p title="close login dialog" className="absolute right-1.5 text-4xl cursor-pointer" onClick={() =>  toggleLoginDialog(false)}>&times;</p>

                        {user?.user?.user_metadata?.display_name && <p>{user?.user?.user_metadata?.display_name}</p>}
                        <button data-testid="logout-user" className="px-5 py-3 text-white cursor-pointer bg-violet-500 hover:bg-violet-600" onClick={() => clearOutUser()}>Logout</button>

                    </section>
            :
            <form data-testid="login-form" action={formAction} className="flex flex-col items-center h-1/2 sm:w-1/3 max-sm:w-full border bg-white border-gray-300 p-3 shadow-2xl relative">
                <span title="close login dialog" className="absolute right-1.5 text-4xl cursor-pointer" onClick={() =>  toggleLoginDialog(false)}>&times;</span>

                <h2 className="text-3xl text-center mb-5 mt-8">Login</h2>

                <input type="text" placeholder="Email" name="email"  required minLength={9} pattern="^\S+@\S+\.\S+$" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <input type="password" placeholder="Password" name="password" minLength={6} required className="py-2 px-3 w-full my-3 border border-gray-300" />
                <button  type="submit" className="p-3 w-1/4 bg-violet-500 hover:bg-violet-700 hover:cursor-pointer text-white">Login</button>
                <p className=" pt-4">Not registered! <Link href="/signup" className="cursor-pointer text-violet-500"> Signup here</Link></p>
                {isPending && <p>
                    Authenticating...
                </p> }
            </form>
            }

        </article>
    )
}

export default LoginDialog;