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
            <div className={classes['item-info']}>
                <div>{props.title}</div>
                <div className={classes['ref-num']}>Ref. {props.id}</div>
            </div>
            <div className={classes['quantity-container']}>
                <button onClick={removeItemFromCartHandler}>-</button>
                <input type="text" value={quantity} disabled/>
                <button onClick={addItemToCartHandler}>+</button>
            </div>
            <div>${props.price.toFixed(2)}</div>
            <button className={classes.xmark} onClick={cancelTheItemHandler}><FaTimes style={{color: '#646464'}}/></button>
        </li>
    )
}
export default CartItem