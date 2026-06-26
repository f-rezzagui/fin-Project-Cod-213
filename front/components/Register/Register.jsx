import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import"./Register.css"

export default function Login() {
    const [name, setName] = useState("")
    const [firstname, setFirstname] = useState("")
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
        <h1>Register</h1>
        <form onSubmit={loginUser}>
             <div className='input-box'>
            <span className='icon'><IoPersonSharp /></span>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} required  />
            <label htmlFor="">Name</label>
          </div>
           <div className='input-box'>
            <span className='icon'><IoPersonSharp /></span>
            <input type="text" value={firstname} onChange={(e)=> setFirstname(e.target.value)} required  />
            <label htmlFor="">first name</label>
          </div>
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
            <div className='input-box'>
              <span className='icon'><RiLockPasswordFill /></span>
             <input type="password"  value={passeword} onChange={(e)=> setPassword(e.target.value)} required />
              <label htmlFor="">Confirm Password</label>
            </div>
            <div className='remember-forgot'>
              <label htmlFor="">
                <input type="checkbox" />   I have read and agree Terms of Use and understand 
              </label>
            </div>
       

        <button type='submit' className='btn'>CREATE  ACCOUNT</button>
        <div className='login-register'>
          <p>By creating an account you agree to our<a href="#" className='register-link'> Conditions</a></p>
        </div>
      </form>
    </div>
    </div>
  )
}
