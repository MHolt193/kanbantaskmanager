import React from 'react'
import {Link} from 'react-router-dom'

const Signup = (props) =>{
    return(
        <div>
            <form>
                <input type='text' placeholder='Name' required/>
                <input type='email' placeholder='Email' required />
                <input type='password' placeholder='Password' required />
                <button type='submit'>Register</button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup