import React from 'react'

const Login = (props) =>{
    return(
        <div>
            <form>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Login</button>
                <p>Need to register? <a href='#'>Register</a></p> 
            </form>
        </div>
    )
}

export default Login