import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";

function Login() {
    //state
    //connect with the input value
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        //firebase login 
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        //firebase register 
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //when its successfully created a new user with email and password
            console.log(auth);
            if(auth) {
                //po autorizaci presmerovat na /. import useHistory
                history.push('/')
            }
        })
        //when error
        .catch((error) => alert(error.message))
    }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          {/* tracking the typed values  */}
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

          <button onClick={signIn} type='submit'
          className="login__signInButton">Sign In</button>
        </form>

        <p>
            By signing-in you agree to the Amazon fake clone conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={register} 
        className='login__registerButton'>Create your Amazon Account</button>

      </div>
    </div>
  );
}

export default Login;
