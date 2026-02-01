
export default async function IndexPage({ searchParams }) {
    const { canceled } = await searchParams


    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and checkout when you’re ready.'
        )
    }
    return (
        <div className="text-center items-center justify-center w-full p-5">

        <form action="/api/checkout_sessions" method="POST">
            <section>
                <p className="text-lg my-3">Please click the button to make payment. You will be redirect to the Stripe payment gateway.</p>
                <button type="submit" role="link" className="bg-violet-500 text-white p-4 hover:bg-violet-700 cursor-pointer">
                    Proceed to payment
                </button>
            </section>
        </form>
        </div>

    )
}