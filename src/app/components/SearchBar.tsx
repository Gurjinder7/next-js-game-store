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
        <div className="my-2 p-2 border-2 border-gray-200 flex w-fit">
            <input className="outline-0" placeholder="Search games here... " type="text" onKeyPress={(e) => handleKeyDown(e)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target?.value)}/>
            <span onClick={handleSearchChange} className="border border-gray-300 p-3 cursor-pointer hover:bg-gray-300"> <img src="/search.svg" className="w-[1rem]" alt="search"/></span>
        </div>
    )
}

export default SearchBar