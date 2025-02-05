import { cartSliceActions } from "../../ridaks/cart-slice"
import { useDispatch } from "react-redux"
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
                <img src="https://www.news10.com/wp-content/uploads/sites/64/2022/06/burger-gce4714a92_1920.jpg" alt={props.title} />
            </div>
            <div className={classes.content}>
                <div>{props.title}</div>
                <p>{props.category}</p>
            </div>
            <div className={classes.price}>$ {props.price.toFixed(2)}</div>
            <div className={classes.action}>
                <button onClick={addItemToCartHandler}>Add to Cart</button>
            </div>
        </li>
    )
}
export default MealItem