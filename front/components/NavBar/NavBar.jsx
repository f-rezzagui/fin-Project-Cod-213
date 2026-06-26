import React from 'react'
import "./NavBar.css"
export default function NavBar() {
  return (
    <div className='header'>
       <h2 className='logo'>logo</h2> 
       <div className='navigation'>
        <a href='#'>Home</a>
       <a href='#'>shop</a>
       <a href='#'>services</a>
       <a href='#'>contact</a>
       <button className='btnLogin-popup'> Login</button>
       </div>
       
    </div>
  )
}
