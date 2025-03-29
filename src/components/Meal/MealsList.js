import { useState } from "react"
import MealItem from "./MealItem"
import Card from "../UI/Card"
import FilterCategory from "./FilterCategory"
import pastaImg from '../../images/pasta.png'
import pizzaImg from '../../images/pizza.jpeg'
import burgerImg from '../../images/burger.png'
import beefImg from '../../images/beef-steak.png'
import chickPastaImg from '../../images/chicken-pasta.png'
import quattroFormaggiImg from '../../images/quattro-formaggi.jpeg'
import classes from './MealsList.module.css'

const DUMMY_PRODUCTS = [
    { id: 'p1', title: 'Bolognese', category: 'Pasta', image: pastaImg, price: 9.20 },
    { id: 'p2', title: 'Peasana', category: 'Pizza', image: pizzaImg, price: 12.10 },
    { id: 'p3', title: 'Chesseburger', category: 'Burger', image: burgerImg, price: 9.90 },
    { id: 'p4', title: 'Beef Organic', category: 'Meat', image: beefImg, price: 35.70 },
    { id: 'p5', title: 'Mexican Tortilla', category: 'Tortilla', image:'https://popmenucloud.com/cdn-cgi/image/width=1200,height=630,format=auto,fit=cover/hkolcqye/70f8fafc-3ed9-4571-96a9-1d9193c0bfbb.jpg', price: 10 },
    { id: 'p6', title: 'Capricciosa', category: 'Pizza', image:'https://images.squarespace-cdn.com/content/v1/61d50d87725cde14d93f0752/b948945a-d251-4116-a38f-f8f66506530b/Three.One.Four_04082024-119.jpg', price: 9.10 },
    { id: 'p7', title: 'Chicken Pasta', category: 'Pasta', image: chickPastaImg, price: 11.30 },
    { id: 'p8', title: 'Bacon Burger', category: 'Burger', image: 'https://theburn.com/wp-content/uploads/2020/01/82621244_3347834808619893_1146827122107482112_n.jpg', price: 11.60 },
    { id: 'p9', title: 'Quattro Formaggi', category: 'Pizza', image: quattroFormaggiImg, price: 10.80 }
]

const MealsList = () => {
    const [meals] = useState(DUMMY_PRODUCTS)
    const [filteredMeals, setFilteredMeals] = useState(DUMMY_PRODUCTS)

    const filterCategoryHandler = (category) => {
        setFilteredMeals(meals.filter((meal) => meal.category === category))
    }
    const clearFilterHandler = () => {
        setFilteredMeals(meals)
    }

    const allProducts = filteredMeals.map(product => <MealItem
        key={product.id}
        id={product.id}
        title={product.title}
        image={product.image}
        price={product.price}
        category={product.category}
    />)

    return (
        <>
            <FilterCategory onFilter={filterCategoryHandler} onClear={clearFilterHandler} />
            <Card className={classes.meals}>
                {(!allProducts || (allProducts.length === 0)) && <p>No meals available for this category.</p>}
                <ul>
                    {allProducts}
                </ul>
            </Card>
        </>
    )
}
export default MealsList