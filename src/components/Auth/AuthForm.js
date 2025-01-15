import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLoading, setIsLoading] = useState()

  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let url 

  const submitFormHandler = e => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value 
    const enteredPassword = passwordInputRef.current.value 

    setIsLoading(true)
    if(isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }

    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      })
    })
    .then(res => {
      setIsLoading(false)
      if(res.ok) {
        return res.json()
      } else {
        return res.json().then(data => {
          throw new Error('Authentication failed!')
        })
      }
    })
    .then(data => {
      console.log(data)
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn) * 1000)                                  
      authCtx.login(data.idToken, expirationTime.toISOString())
      history.replace('/')
    })
    .catch(err => {
      alert(err.message)
    })

    console.log(enteredEmail, enteredPassword)
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} minLength='6'/>
        </div>
        <div className={classes.actions}>
          {isLoading && <p>Sending request...</p>}
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
