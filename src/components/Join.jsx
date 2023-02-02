import React from 'react';
import "../styles/join.css"
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from "../context/AuthContext";

function Join() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt="logo" />
            <h1>C CHAT</h1>
            <input type="text" id='joinInput' placeholder='Enter Your Name' onChange={(e) => {
                    setUser(e.target.value)
            }} />
           <Link to={"/chat"} onClick={(e) => !user ? e.preventDefault():null}><button className='joinbtn'>Log In</button></Link> 
        </div>
    </div>
  )
}

export default Join;
