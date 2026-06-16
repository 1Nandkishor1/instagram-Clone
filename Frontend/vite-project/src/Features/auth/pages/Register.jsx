import {React,useState} from 'react'
import "../style/form.scss"
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
        const { loading, handleRegister } = useAuth()

    const [username, setusername] = useState(null)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)

        const navigate = useNavigate()

    async function submitHandler(e){
        e.preventDefault();
        await handleRegister(username,email,password)
        navigate('/')
    }
    if (loading) {
        return (<main><h1>Loading....</h1></main>)
    }
    
  return (
    <main>
        <div className='loginform'>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input onInput={(e)=>{setusername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
                <input onInput={(e)=>{setemail(e.target.value)}} type="text" name='email' placeholder='Enter Email' />
                <input onInput={(e)=>{setpassword(e.target.value)}} type="password" name='password' placeholder='Enter password' />
                <button>Register</button>
            </form>
            <p>already have an account? <Link className='linktag' to="/login">Login</Link> </p>
        </div>
    </main>

  )
}

export default Register