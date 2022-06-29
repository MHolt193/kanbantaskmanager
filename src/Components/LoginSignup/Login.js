import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () =>{

    const navigate = useNavigate();

    const loginSubmitHandler = async (event) =>{
        event.preventDefault();
        const form = event.target
        const formData = {
            email: form.email.value,
            password: form.password.value
        }
       await axios.post('http://192.168.0.57:5000/api/users/login', formData)
                    .then((response)=>{
                        const data = response.data
                        localStorage.setItem('token', JSON.stringify(data.token) )
                        localStorage.setItem('user', JSON.stringify(data._id))
                        if(response.status === 200){
                            navigate('/', {replace: true})   
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
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