import { cartSliceActions } from "../../ridaks/cart-slice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import classes from './MealItem.module.css'

const MealItem = (props) => {
    const dispatch = useDispatch()

    const addItemToCartHandler = () => {
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
                <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
                <div>{props.title}</div>
                <p>{props.category}</p>
                <Link to={`/meal-details/${props.id}`} className={classes['meal-link']}>Discover Meal</Link>
            </div>
            <div className={classes.price}>${props.price.toFixed(2)}</div>
            <div className={classes.action}>
                <button onClick={addItemToCartHandler}>Add to Cart</button>
            </div>
        </li>
    )
}
export default MealItem