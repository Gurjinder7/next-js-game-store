"use client"

import {useActionState, useEffect, useState} from "react";
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
    // const {clearData } = useAppStore()

    const { error } = await supabase.auth.signOut()
    console.log("Sign Out")
    console.log(error)
    // clearData()

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
    // const name = formData.get("name");
    console.log(prevState)
    // console.log(username, password);

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

    const [formResult, setFormResult ] = useState();
    const router = useRouter()

    const { toggleLoginDialog, authenticated, setAuthenticated, setUser, clearData, user } = useAppStore()
    const [state, formAction, isPending] = useActionState(submitForm, initialState);

    console.log(isPending)
    console.log(state)

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
        <div className="fixed h-[100vh] w-[100vw] top-0 p-5 flex flex-col justify-center items-center bg-violet-100">
            {
                authenticated ?
                    <div className="flex flex-col items-center h-1/2 w-1/3 border bg-white border-gray-300 p-3 shadow-2xl relative">
                        <span title="close login dialog" className="absolute right-1.5 text-4xl cursor-pointer" onClick={() =>  toggleLoginDialog(false)}>&times;</span>

                        {user?.user?.user_metadata?.display_name && <p>{user?.user?.user_metadata?.display_name}</p>}
                        <button className="px-5 py-3 text-white cursor-pointer bg-violet-500 hover:bg-violet-600" onClick={() => clearOutUser()}>Logout</button>

                    </div>
            :
            <form action={formAction} className="flex flex-col items-center h-1/2 w-1/3 border bg-white border-gray-300 p-3 shadow-2xl relative">
                <span title="close login dialog" className="absolute right-1.5 text-4xl cursor-pointer" onClick={() =>  toggleLoginDialog(false)}>&times;</span>

                <h2 className="text-3xl text-center mb-5 mt-8">Login</h2>

                <input type="text" placeholder="Email" name="email"  required minLength={9} pattern="^\S+@\S+\.\S+$" className="py-2 px-3 w-full my-3 border border-gray-300" />
                <input type="password" placeholder="Password" name="password" minLength={6} required className="py-2 px-3 w-full my-3 border border-gray-300" />
                <button  type="submit" className="p-3 w-1/4 bg-violet-500 hover:bg-violet-700 hover:cursor-pointer text-white">Login</button>
                <p className=" pt-4">Not registered! <Link href="/signup" className="cursor-pointer text-violet-500"> Signup here</Link></p>

            </form>
            }

        </div>
    )
}

export default LoginDialog;