import React from 'react'
import {Link} from 'react-router-dom'

const Login = (props) =>{
    return(
        <div>
            <form>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Login</button>
                <p>Need to register? <Link to='/signup'>Register</Link></p> 
            </form>
        </div>
    )
}

export default Login