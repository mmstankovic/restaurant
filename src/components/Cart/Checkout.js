import { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isNotEmpty = (value) => value.trim() !== ''
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const submitHandler = e => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value 
        const enteredPostalCode = postalInputRef.current.value 
        const enteredCity = cityInputRef.current.value 

        const nameInputIsValid = isNotEmpty(enteredName)
        const streetInputIsValid = isNotEmpty(enteredStreet)
        const postalCodeInputIsValid = isFiveChars(enteredPostalCode)
        const cityInputIsValid = isNotEmpty(enteredCity)

        setFormInputsValidity({
            name: nameInputIsValid,
            street: streetInputIsValid,
            postalCode: postalCodeInputIsValid,
            city: cityInputIsValid
        })
    
        const formIsValid = nameInputIsValid && streetInputIsValid && postalCodeInputIsValid && cityInputIsValid 

        if(!formIsValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })
    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes['form-col-1']}>
                <div className={nameControlClasses}>
                    <label htmlFor="name">Your Name</label>
                    <input ref={nameInputRef} type="text" id="name"/>
                    {!formInputsValidity.name && <p className={classes['error-text']}>Please enter a valid name!</p>}
                </div>
                <div className={streetControlClasses}>
                    <label htmlFor="street">Street</label>
                    <input ref={streetInputRef} type="text" id="street"/>
                    {!formInputsValidity.street && <p className={classes['error-text']}>Please enter a valid street!</p>}
                </div>
            </div>
            <div className={classes['form-col-2']}>
                <div className={postalCodeControlClasses}>
                    <label htmlFor="postal">Postal Code</label>
                    <input ref={postalInputRef} type="text" id="postal"/>
                    {!formInputsValidity.postalCode && <p className={classes['error-text']}>Please enter a valid postal code!</p>}
                </div>
                <div className={cityControlClasses}>
                    <label htmlFor="city">City</label>
                    <input ref={cityInputRef} type="text" id="city"/>
                    {!formInputsValidity.city && <p className={classes['error-text']}>Please enter a valid city!</p>}
                </div>
                <div className={classes.actions}>
                    <button type="button" onClick={props.onCancel}>Cancel</button>
                    <button className={classes.submit}>Confirm</button>
                </div>
            </div>
        </form>
    )
}
export default Checkout