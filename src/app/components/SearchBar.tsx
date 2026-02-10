"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter()

    const handleSearchChange = () => {
        router.push(`/?query=${encodeURIComponent(searchTerm)}`);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;
        if (key === "Enter") {
            handleSearchChange();
        }
    }
    return (
        <article className="my-2 p-2 border-2 border-gray-200 flex w-fit max-sm:w-full relative">
            <input className="outline-0" placeholder="Search games here... " type="text" onKeyPress={(e) => handleKeyDown(e)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target?.value)}/>
            <span onClick={handleSearchChange} className="absolute right-0 top-0 cursor-pointer bg-gray-300"> <img src="/search.svg" className="w-[2.5rem]" alt="search"/></span>
        </article>
    )
}

export default SearchBar