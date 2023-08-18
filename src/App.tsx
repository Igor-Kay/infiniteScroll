import { useInView } from 'react-intersection-observer';

function App() {
  const {ref, inView} = useInView({
    threshold: 0.5,
  })

  console.log ('====>inview', inView)

  return (
    <div className="bg-violet-500">
      <div className="min-h-screen">Hello</div>
      <div ref = {ref} className="h-5 bg-red-400"/>
    </div>
  )
}

export default App
