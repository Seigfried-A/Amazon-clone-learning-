import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

import './SignIn.css'

function SignIn() {
    
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const createAccHandler = (event) => {
            event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {
            if(auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))

    }

    const signInHandler = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }
 
    return (
        <div className="signIn">
            <Link to="/">
                 <img  className="signIn__logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                        alt="" />
            </Link>
            <div className="signIn__container">
                <h1>Sign In</h1>
                <form>

                    <h5>Email</h5>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>

                    <button onClick={signInHandler}  className="signIn__btn">Sign In</button>

                    
                </form>
                <p>By continuing, you agree to Amazon's Conditions
                     of Use and Privacy Notice.</p>
            </div>
            <div className="signIn__new">
                <p className="signIn__newtext">
                <span className="signInText__style">
                New to Amazon?
                </span>
                </p>
                <button onClick={createAccHandler} className="signup__createAcc">
                    Create a new Account
                </button>
            </div>
        </div>
    )
}

export default SignIn
