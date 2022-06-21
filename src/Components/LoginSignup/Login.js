import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = (props) =>{

    const loginSubmitHandler = async (event) =>{
        event.preventDefault();
        const form = event.target
        const formData = {
            email: form.email.value,
            password: form.password.value
        }
        console.log(formData);
    }

    return(
        <div>
            <form onSubmit={loginSubmitHandler}>
                <input type='email' placeholder='Email' name='email' />
                <input type='password' placeholder='Password' name='password' />
                <button type='submit'>Login</button>
                <p>Need to register? <Link to='/signup'>Register</Link></p> 
            </form>
        </div>
    )
}

export default Login