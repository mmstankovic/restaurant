import { useReducer } from "react"

const defaultState = {value: '', isTouched: false}

const inputReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if(action.type === 'BLUR_INPUT') {
        return {value: state.value, isTouched: true}
    }
    return defaultState
}

const useInput = (validateValue) => {
    const [inputState, dispatchInputActions] = useReducer(inputReducer, defaultState) 

    const enteredValueIsValid = validateValue(inputState.value)
    const hasError = !enteredValueIsValid && inputState.isTouched

    const valueChangeHandler = (e) => {
        dispatchInputActions({type: 'USER_INPUT', value: e.target.value})
    }

    const blurInputHandler = () => {
        dispatchInputActions({type: 'BLUR_INPUT'})
    }

    return {
        value: inputState.value,
        isValid: enteredValueIsValid,
        hasError: hasError,
        isTouched: inputState.isTouched,
        valueChangeHandler: valueChangeHandler,
        blurInputHandler: blurInputHandler
    }

}
export default useInput