"use client"

import {useRouter,usePathname, useSearchParams} from "next/navigation";
import {createQueryUrl} from "@/utils/helpers/urlPath";

const SortGames = () => {

    const router = useRouter();

    console.log(usePathname(), useSearchParams().toString());
    const searchParams = useSearchParams().toString();
    const pathname = usePathname();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("handleSortChange", e.target.value);
        let selectedOption = e.target.value;

        let sortBy = "name";
        let sortOrder = "asc"

        if (selectedOption === "1") {
            sortBy = "name";
            sortOrder = "desc";
        } else if (selectedOption === "2") {
            sortBy = "price";
            sortOrder = "asc";
        } else if (selectedOption === "3") {
            sortBy = "price";
            sortOrder = "desc";
        }
        router.push(`${pathname}?sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}${searchParams ? createQueryUrl(false,searchParams): ""}`);
    }
    return (
        <select data-testid="game-sort" onChange={handleSortChange} className="border-2 border-gray-200 p-2">
            {/*<option value=""></option>*/}
            <optgroup label="Name">
                <option value="0">Asc</option>
                <option value="1">Desc</option>
            </optgroup>
            <optgroup label="Price">
                <option value="2">Low-High</option>
                <option value="3">High-Low</option>
            </optgroup>
            <option></option>

        </select>
    )
}

export default SortGames;