import CartIcon from './CartIcon'
import classes from './CartButton.module.css'

const CartButton = (props) => {
    return  (
        <button className={classes.button}>
            <span className={classes.icon}><CartIcon /></span>
            <span>MY CART</span>
            <span className={classes.badge}>{props.totalQuantity}</span>
        </button>
    )
}
export default CartButton