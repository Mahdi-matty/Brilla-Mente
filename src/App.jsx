import { Outlet  } from 'react-router-dom';
import Nav from './components/nav'
import './index.css'
function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"></link>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
