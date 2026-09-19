import { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import "./App.css"
function App() {
  const [count, setCount] = useState(0)

  return (
    < >
      <div className='body'>

        <Register/>

         <NavBar/>

      <Login />
      </div>
    
    </>
  )
}

export default App
