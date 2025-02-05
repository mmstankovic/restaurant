import burgerIllustration from '../../images/burger-illustration.png'
import classes from './MealsWelcome.module.css'

const MealsWelcome = () => {
    return (
        <div className={classes.welcome}>
            <div className={classes['image-container']}>
                <img src={burgerIllustration} alt='burger'/>
            </div>
            <h1>Explore Our Flavorful Menu</h1>
            <p>Our menu is carefully crafted with fresh ingredients and bold flavors to ensure every meal is a memorable experience.<br />Explore our range of delicious options below!</p>
        </div>
    )
}
export default MealsWelcome