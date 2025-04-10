import { useState, useEffect } from "react"
import MealItem from "./MealItem"
import Card from "../UI/Card"
import LoadingSpinner from "../UI/LoadingSpinner"
import FilterCategory from "./FilterCategory"
import classes from './MealsList.module.css'

const MealsList = () => {
    const [loading, setLoading] = useState(false)
    const [httpError, setHttpError] = useState(null)
    const [meals, setMeals] = useState([])
    const [filteredMeals, setFilteredMeals] = useState([])

    useEffect(() => {
        setHttpError(null)
        setLoading(true)
        const fetcMealsData = async() => {
            try {
                const res = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/menu.json`)
                const data = await res.json()

                if(!res.ok) {
                    throw new Error('Fetching meals data failed.')
                }
                
                setMeals(data.meals)
                setFilteredMeals(data.meals)

                setLoading(false)
            } catch (err) {
                setHttpError(err.message)
                setLoading(false)
            }
        }
        fetcMealsData()
    },[])

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

    if(loading) {
        return <LoadingSpinner />
    }
    
    if(!loading && httpError) {
        return <p className={classes['http-error']}>{httpError}</p>
    }

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