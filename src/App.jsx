import { Outlet  } from 'react-router-dom';


function App() {

  return (
    <>
    <Nav />
    <main className="mx-3">
        <Outlet />
      </main>
      
    </>
  )
}

export default App
