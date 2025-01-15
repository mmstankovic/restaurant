import { useDispatch } from "react-redux"
import { cartSliceActions } from "../../ridaks/cart-slice"
import classes from './CartItem.module.css'
import {FaTimes} from 'react-icons/fa'

const CartItem = (props) => {
    const dispatch = useDispatch()
    const {id, quantity} = props

    const addItemToCartHandler = () => {
        dispatch(cartSliceActions.addItemToCart({
            id: props.id,
            title: props.title,
            price: props.price,
            quantity: 1
        }))
    }

    const cancelTheItemHandler = () => {
        dispatch(cartSliceActions.cancelTheItem(id))
    }
    const removeItemFromCartHandler = () => {
        dispatch(cartSliceActions.removeItemFromCart(id))
    }

    return (
        <li className={classes['cart-item']}>
            <div style={{width: '90%', maxWidth: '80px'}}>
                <div>{props.title}</div>
                <div className={classes['ref-num']}>Ref. {props.id}</div>
            </div>
            <div>
                <button onClick={removeItemFromCartHandler}>-</button>
                <input type="text" style={{width: '30px', textAlign: 'center', marginLeft: 5, marginRight: 5}} value={quantity} disabled/>
                <button onClick={addItemToCartHandler}>+</button>
            </div>
            <div>${props.price.toFixed(2)}</div>
            <button className={classes.xmark} onClick={cancelTheItemHandler}><FaTimes style={{color: '#646464'}}/></button>
        </li>
    )
}
export default CartItem