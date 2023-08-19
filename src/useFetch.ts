import axios from 'axios';
import {useEffect, useState} from 'react';

export interface Item {
    userId: number
    id:number
    title:string
    completed: boolean
}

interface State<T> {
    loading: boolean
    data: T[]
    error: Error | null
    totalCount: number
}

export const useFetch = <T extends Item>(url: string, _page: number): State<T> => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() =>{
        setLoading(true)
        setTimeout(()=>{
            axios.get(url,{
                params: {
                    _page,
                    _limit: 20,
                },
            })
            .then(res => {
                
                setData(res.data)
                setTotalCount(res.headers['x-total-count'])
            })
            .catch(setError)
            .finally(() => setLoading (false))
        }, 1000)
    }, [url, _page])

    return {
        loading,
        data,
        error,
        totalCount
    }
}