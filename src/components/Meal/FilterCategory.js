import mealTimeImg from '../../images/meal-time.png'
import classes from './FilterCategory.module.css'

const categories = ['Burger','Meat','Pasta','Pizza','Tortilla']

const FilterCategory = ({onFilter, onClear}) => {

    const changeCategoryHandler = (category) => {
        onFilter(category)
    }

    return (
        <div className={classes['filter-category']}>
            <div className={classes['image-container']}>
                <img src={mealTimeImg} alt='meal time' />
            </div>
            <h2>Top Categories</h2>
            <ul>
                <li><button onClick={onClear}>All</button></li>
                {categories.map((cat) => <li key={cat}><button onClick={() => changeCategoryHandler(cat)}>{cat}</button></li>)}
            </ul>
        </div>
    )
}
export default FilterCategory