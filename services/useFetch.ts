import {useEffect, useState} from 'react';
const useFetch = <T>(fetchFunction : () => Promise<T> ,autoFetch = true) => {
    const[data,setData] = useState<T | null>(null);
    const[error,setError] = useState<Error | null>(null);

    const fetchData = async() => {
        try { 
            
            const result = await fetchFunction();
            setData(result);
        } catch(err) {
            setError(err instanceof Error ? err : new Error('An error occured'));
        }
    }
    const reset = () => {
        setData(null);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch){ 
            fetchData();
        }
    },[]);

    return({data,error,refetch : fetchData,reset});
}

export default useFetch;