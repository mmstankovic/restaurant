import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartSliceActions } from "../../ridaks/cart-slice"
import CartItem from "./CartItem"
import Modal from "../UI/Modal"
import Checkout from './Checkout'
import classes from './Cart.module.css'

const Cart = (props) => {
    const cartItems = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const history = useHistory()
    const dispatch = useDispatch()

    const [isCheckout, setIsCheckout] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    const allProduts = cartItems.map(product => <CartItem 
        key={product.id} 
        id={product.id} 
        title={product.title} 
        description={product.description} 
        price={product.price}
        quantity={product.quantity}
    />)

    const submitOrderHandler = async (userData) => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/orders.json`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: userData,
                    items: cartItems
                })
            })
            const data = await res.json()
    
            if(!res.ok) {
                throw new Error('Sending order failed.')
            }
            if(data.name) {
                setStatus('You order has been placed.')
                dispatch(cartSliceActions.clearCart())
            }
            setLoading(false)
        } catch (err) {
            setStatus('The service is temporarily unavailable, please try again later.')
            console.log(err.message)
            setLoading(false)
        }
        
    }
    
    const closeCartHandler = () => {
        setStatus('')
        history.replace('/menu')
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }
    const cancelOrderHandler = () => {
        setIsCheckout(false)
    }

    let content = <p>Your cart is empty!</p>

    if(props.error) {
        content = <p>{props.error}</p>
    }
    if(!props.error && (allProduts.length !== 0)) {
        content = <ul>{allProduts}</ul>
    }

    return (
        <Modal className={classes.cart} onClose={closeCartHandler}>
            <h1>Shopping Cart</h1>
            {content}
            <div className={classes.subtotal}>Subtotal: <span>${totalAmount.toFixed(2)}</span></div>
            <div className={classes.actions}>
                <button className={classes['back-button']} onClick={closeCartHandler}><i className="fa-solid fa-arrow-left-long"></i> Back to Shop</button>
                {!isCheckout && (cartItems.length > 0) && <button className={classes.checkout} onClick={orderHandler}>Order</button>}
            </div>
           {isCheckout && (cartItems.length > 0) && <Checkout onCancel={cancelOrderHandler} onConfirm={submitOrderHandler} loading={loading} status={status}/>}
        </Modal>   
    )
}
export default Cart