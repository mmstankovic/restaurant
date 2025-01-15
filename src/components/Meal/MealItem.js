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
    return <li className={classes.item}>
        <div className={classes['col-1-2']}>
            <div className={classes['image-container']}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/800px-Supreme_pizza.jpg" alt={props.title} />
            </div>
            <div className={classes.content}>
                <div>{props.title}</div>
                <p>{props.description}</p>
            </div>
        </div>
        <div className={classes.price}>$ {props.price.toFixed(2)}</div>
        <div className={classes['col-2-2']}>
            <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
    </li>
}
export default MealItem