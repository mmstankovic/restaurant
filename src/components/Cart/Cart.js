import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import CartItem from "./CartItem"
import Modal from "../UI/Modal"
import Checkout from './Checkout'
import classes from './Cart.module.css'

const Cart = (props) => {
    const cartItems = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const history = useHistory()

    const [isCheckout, setIsCheckout] = useState(false)

    const allProduts = cartItems.map(product => <CartItem 
        key={product.id} 
        id={product.id} 
        title={product.title} 
        description={product.description} 
        price={product.price}
        quantity={product.quantity}
    />)

    const submitOrderHandler = (userData) => {
        fetch(`${process.env.REACT_APP_FIREBASE_URL}/orders.json`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: userData,
                items: cartItems
            })
        })
    }
    
    const closeCartHandler = () => {
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
            <div className={classes.subtotal}>Subtotal: <span>{totalAmount.toFixed(2)} $</span></div>
            <div className={classes.actions}>
                <button className={classes['back-button']} onClick={closeCartHandler}><i class="fa-solid fa-arrow-left-long"></i> Back to Shop</button>
                {!isCheckout && <button className={classes.checkout} onClick={orderHandler}>Order</button>}
            </div>
           {isCheckout && <Checkout onCancel={cancelOrderHandler} onConfirm={submitOrderHandler} />}
        </Modal>   
    )
}
export default Cart