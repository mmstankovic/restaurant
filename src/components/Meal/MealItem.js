import { useContext } from "react"
import AuthContext from "../../store/auth-context"
import { cartSliceActions } from "../../ridaks/cart-slice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import classes from './MealItem.module.css'

const MealItem = (props) => {
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch()

    const addItemToCartHandler = () => {
        if(!authCtx.isLoggedIn) {
            return
        }
        dispatch(cartSliceActions.addItemToCart({
            id: props.id,
            title: props.title,
            price: props.price,
            quantity: 1
        }))
    }
    return (
        <li className={classes.item}>
            <div className={classes['image-container']}>
                <img src={require(`../../images/${props.image}`).default} alt={props.title} />
            </div>
            <div className={classes.content}>
                <div>{props.title}</div>
                <p>{props.category}</p>
                <Link to={`/meal-details/${props.id}`} className={classes['meal-link']}>Discover Meal</Link>
            </div>
            <div className={classes.price}>${props.price.toFixed(2)}</div>
            <div className={classes.action}>
                <button className={!authCtx.isLoggedIn ? 'disabled-btn' : undefined} disabled={!authCtx.isLoggedIn} onClick={addItemToCartHandler}>Add to Cart</button>
            </div>
        </li>
    )
}
export default MealItem