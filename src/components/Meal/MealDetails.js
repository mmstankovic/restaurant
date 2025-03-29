import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { cartSliceActions } from '../../ridaks/cart-slice'
import { IoMdArrowRoundBack } from "react-icons/io";
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './MealDetails.module.css'

const MealDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [meal, setMeal] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/menu.json`)
                const data = await res.json()

                if (!res.ok) {
                    throw new Error('Fetching meal details failed, please try again.')
                }
                const mealData = data.meals.find((el) => el.id === id)
                setMeal(mealData)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }
        fetchMealDetails()
    }, [id])

    const increaseQuantity = () => {
        setQuantity((prevState) => prevState + 1)
    }
    const decreaseQuantity = () => {
        setQuantity((prevState) => prevState > 1 ? (prevState - 1) : 1)
    }

    const addItemHandler = () => {
        dispatch(cartSliceActions.addItemToCart({
            id: 'p6',
            title: 'Capricciosa',
            price: 9.10,
            quantity: quantity
        }))
    }

    if(loading) {
       return <LoadingSpinner />
    }

    return (
        <div className={classes['details-container']}>
            <Link className={classes['back-link']} to='/menu'><IoMdArrowRoundBack />Back to Menu</Link>
            <div className={classes['flex-container']}>
                <div className={classes['mealimg-container']}>
                    <img src={require(`../../images/${meal.image}`).default} alt='meal' />
                </div>
                <div className={classes['mealtext-container']}>
                    <h2>{meal.title}</h2>
                    <p>This BBQ chicken pizza has spicy barbecue sauce,
                        diced chicken, peppers, onion, and cilantro,
                        all covered with cheese and baked to bubbly goodness!
                    </p>
                    <p className={classes['meal-price']}>Price - $<span>{meal.price.toFixed(2)}</span></p>
                    <p className={classes['ingredients']}>Ingredients:</p>
                    <ul className={classes['ingredients-list']}>
                        <li>Ground beef</li>
                        <li>Burger buns</li>
                        <li>Ketchup</li>
                        <li>Lettuce</li>
                        <li>Pickles</li>
                        <li>Sliced tomato</li>
                    </ul>
                    <div className={classes.actions}>
                        <div className={classes['quantity']}>
                            <button onClick={decreaseQuantity}>-</button>
                            <input type="text" disabled value={quantity} />
                            <button onClick={increaseQuantity}>+</button>

                        </div>
                        <button className={classes['add-btn']} onClick={addItemHandler}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className={classes['desc-container']}>
                <h2>Description</h2>
                <p>The pizza capricciosa is a classic Italian dish that has been enjoyed for decades by diners around the world. But where did this delicious pizza originate, and how did it become such a beloved dish?</p>
                <p>In the 1950s, the pizza capricciosa was first created in Italy by a group of Italian restaurateurs who were looking to innovate and bring something new to the table. The name “capricciosa” literally means “capricious” in Italian, perfectly describing the playful and unpredictable nature of the ingredients used in this pizza.</p>
                <p>The pizza capricciosa is traditionally made with various toppings, including ham, artichokes, mushrooms, and olives. These ingredients are carefully selected and combined to create a unique and flavourful pizza that satisfies even the most discerning palate.</p>
                <p>Today, the pizza capricciosa can be found on the menu of many Italian restaurants worldwide, including Criniti’s, a popular Italian restaurant chain known for its delicious woodfired pizzas and traditional Italian dishes. At Criniti’s, the pizza capricciosa is made with the freshest ingredients and cooked to perfection in their woodfired ovens.</p>
                <p>So next time you’re in the mood for a delicious and satisfying pizza, consider trying the pizza capricciosa at Criniti’s. Its unique combination of flavors and high-quality ingredients will become one of your new favorite dishes. Buon Appetito!</p>
            </div>
        </div>
    )
}
export default MealDetails