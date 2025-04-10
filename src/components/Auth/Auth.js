import { useState, useContext } from "react"
import AuthForm2 from "./AuthForm2"
import AuthContext from "../../store/auth-context"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const authCtx = useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    let url

    const sendRequest = (email, password) => {
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
        email: email,
        password: password,
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
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn) * 1000)
      authCtx.login(data.idToken, expirationTime.toISOString())
      //history.replace('/')
    })
    .catch(err => {
      alert(err.message)
    })

    }

    return (
        <section>
            <AuthForm2 isLogin={isLogin} isLoading={isLoading} onSwitchAuthMode={switchAuthModeHandler} onSendRequest={sendRequest}/>
        </section>
    )
}
export default Auth