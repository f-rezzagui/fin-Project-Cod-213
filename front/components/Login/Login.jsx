import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import"./Login.css"

export default function Login() {
    const [email, setEmail] = useState("")
    const [passeword, setPassword] = useState("")
    // const navigate = useNavigate()
    const loginUser= async(e)=>{
        e.preventDefault()
        const res = await fetch("http://localhost:3000/login",{
            method : "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email, passeword
            })
        })
        const data = await res.json()
        if (data.token){
            localStorage.setItem("token", data.token)
            navigate("/profile")
        }
    }



  return (
   <div className='wrapper'>
       <div className='form-box login'> 
        <h1>login</h1>
        <form onSubmit={loginUser}>
          <div className='input-box'>
            <span className='icon'><MdEmail /></span>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required  />
            <label htmlFor="">Email</label>
          </div>
            <div className='input-box'>
              <span className='icon'><RiLockPasswordFill /></span>
             <input type="password"  value={passeword} onChange={(e)=> setPassword(e.target.value)} required />
              <label htmlFor="">Password</label>
            </div>
            <div className='remember-forgot'>
              <label htmlFor="">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
       

        <button type='submit' className='btn'>login</button>
        <div className='login-register'>
          <p>Don't have an account? <a href="#" className='register-link'>Register</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}
