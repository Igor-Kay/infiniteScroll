import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Item, useFetch } from './useFetch';
import { useMemo } from 'react';

//https://jsonplaceholder.typicode.com/todos/



function App() {

  const [data, setData] = useState<Item[]>([])
  const [page, setPage] = useState<number>(0)

  const {data: resData, loading, totalCount} = useFetch('https://jsonplaceholder.typicode.com/todos/', page)

  const {ref, inView} = useInView({
    threshold: 0.5,
  })

  const isFetching = useMemo<boolean>(
    () => +totalCount > data.length,
    [totalCount, data]
  )

  useEffect(() => {
    if (resData && isFetching){
      setData(prev => [...prev, ...resData])
    }
  }, [resData])

  useEffect(() =>{
    if (data && inView){
      setPage(prev => prev += 1)
    }
  }, [inView])

  return (
    <div className="bg-violet-500 p-2">
      <div className="min-h-screen">
        {data && data.map(({id,title}) => <div key = {id} className='bg-white p-2 mb-2 rounded-md'>
          <strong>({id})</strong> - Item - {title}
          </div>)}
      </div>
      {loading && isFetching && <p>Loading...</p>}
      {!loading && isFetching && <div ref = {ref} className="h-5 bg-white-400"/>}
    </div>
  )
}

export default App
