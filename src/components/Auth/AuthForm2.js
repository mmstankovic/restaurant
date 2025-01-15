import { Prompt } from 'react-router-dom'
import useInput from '../../hooks/use-input'
import classes from './AuthForm.module.css'

const AuthForm2 = (props) => {
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailHasError,
        isTouched: emailIsTouched,
        valueChangeHandler: emailChangeHandler,
        blurInputHandler: emailInputBlurHandler
    } = useInput(value => value.includes('@'))

    const {
        value: enteredPassword, 
        isValid: enteredPasswordIsValid, 
        hasError: passwordHasError, 
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangeHandler, 
        blurInputHandler: passwordInputBlurHandler
    } = useInput(value => value.trim() !== '')

    let formIsValid = false

    if(enteredEmailIsValid && enteredPasswordIsValid) {//
        formIsValid = true
    }

    const submitFormHandler = (e) => {
        e.preventDefault()

        if(!formIsValid) {
            return
        }

        props.onSendRequest(enteredEmail, enteredPassword)
    }

    return (
        <div className={classes.auth}>
            <Prompt when={emailIsTouched || passwordIsTouched} message={() => 'Are you sure want to leave? All data will be lost!'}/>
             <h1>{props.isLogin ? 'Login' : 'Sign Up'}</h1>
             <form onSubmit={submitFormHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required value={enteredEmail} onChange={emailChangeHandler} onBlur={emailInputBlurHandler}/>
                    {emailHasError && <p>Please enter a valid email adress!</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required minLength='6' value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordInputBlurHandler}/>
                    {passwordHasError && <p>Please enter a valid password!</p>}
                </div>
                <div className={classes.actions}>
                    {props.isLoading && <p>Sending request...</p>}
                    {!props.isLoading && <button disabled={!formIsValid}>{props.isLogin ? 'Login' : 'Create Account'}</button>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={props.onSwitchAuthMode}
                    >
                        {props.isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AuthForm2

 /*const [enteredEmail, setEnteredEmail] = useState('')
    const [emailInputIsTouched, setEmailInputIsTouched] = useState(false)

    const enteredEmailIsValid = enteredEmail.includes('@')
    const emailInputIsInvalid = !enteredEmailIsValid && emailInputIsTouched*/

 /*const emailChangeHandler = e => {
        setEnteredEmail(e.target.value)
    }
    const emailInputBlurHandler = () => {
        setEmailInputIsTouched(true)
    }*/