import { useEffect, useState } from "react"

export const useDebounceHook = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return()=>clearTimeout(timeOut)
    }, [value, delay]);

    return debouncedValue;
}



// How to use the app
// const [search,setSearch]=useState('');
// const debouncedSearch=useDebounceHook(search);

// useEffect(()=>{
// console.log("search",search)
// console.log("API Caller here ")
// },[search])