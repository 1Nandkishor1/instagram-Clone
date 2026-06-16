import React from 'react'
import "../components/nav.scss";
import { useNavigate } from 'react-router';

const Nav = () => {
    let Navigate=useNavigate();
  return (
    <div className='nav'>
        <p>Instagram</p>
        <button onClick={()=>{Navigate("/createpost")}}  className='button'>New Post</button>
    </div>
  )
}

export default Nav