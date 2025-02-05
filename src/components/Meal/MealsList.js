import { useState } from "react"
import MealItem from "./MealItem"
import Card from "../UI/Card"
import FilterCategory from "./FilterCategory"
import classes from './MealsList.module.css'

const DUMMY_PRODUCTS = [
    { id: 'p1', title: 'Bolognese', category: 'Pasta', price: 9.20 },
    { id: 'p2', title: 'Peasana', category: 'Pizza', price: 12.10 },
    { id: 'p3', title: 'Chesseburger', category: 'Burger', price: 9.90 },
    { id: 'p4', title: 'Beef Organic', category: 'Steak', price: 35.70 },
    { id: 'p5', title: 'Mexican Tortilla', category: 'Tortilla', price: 10 },
    { id: 'p6', title: 'Capricciosa', category: 'Pizza', price: 9.10 }
]

const MealsList = () => {
    const [meals, setMeals] = useState(DUMMY_PRODUCTS)
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