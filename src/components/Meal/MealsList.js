import MealItem from "./MealItem"
import Card from "../UI/Card"
import classes from './MealsList.module.css'

const DUMMY_PRODUCTS = [
    {id: 'p1', title: 'A Book', description: 'My first book', price: 9.20},
    {id: 'p2', title: 'An Apple', description: 'Fresh fruit', price: 2.10},
    {id: 'p3', title: 'Air filter', description: 'Ufi air filter', price: 9.90},
    {id: 'p4', title: 'Cabin filter', description: 'Cabin carbon filter', price: 5.70}
]

const MealsList = () => {
    const allProduts = DUMMY_PRODUCTS.map(product => <MealItem 
        key={product.id} 
        id={product.id} 
        title={product.title} 
        price={product.price} 
        description={product.description}
    />)
    return (
        <Card className={classes.meals}>
            <ul>
                {allProduts}
            </ul>
        </Card>
    )
}
export default MealsList