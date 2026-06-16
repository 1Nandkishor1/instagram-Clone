import { React, useState } from 'react'
import "../style/form.scss"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
    const { user, loading, handleLogin } = useAuth()

    const [username, setusername] = useState(null);
    const [password, setpassword] = useState(null);

    const navigate = useNavigate()

    async function submitHandler(e) {
        e.preventDefault();
        handleLogin(username,password)
        .then(res=>{
            console.log(res)
        })
        
        navigate('/')
    }
    if(loading){
      return <main>
            <h1>Loading...</h1>
        </main>
    }
    return (
        <main>
            <div className='loginform'>
                <h1>Login</h1>
                <form onSubmit={submitHandler}>
                    <input
                        onInput={(e) => { setusername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter Username' />
                    <input
                        onInput={(e) => { setpassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button className='button'>Login</button>
                </form>
                <p>not have an account? <Link className='linktag' to="/register">Register</Link> </p>
            </div>
        </main>
    )
}

export default Login