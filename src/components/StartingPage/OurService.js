import foodOrdering from '../../images/food-ordering.png'
import mealImg from '../../images/meal.png'
import classes from './OurService.module.css'

const OurService = () => {
    return (
        <div className={classes.service}>
            <p className='heading'>OUR SERVICE</p>
            <h2>How Does It Work?</h2>
            <ul className={classes.steps}>
                <div className={classes.step}>
                    <div className={classes['image-container']}>
                        <img src={foodOrdering} alt='service' />
                    </div>
                    <h3>Easy To Order</h3>
                    <p>You only need a few steps in <br/> ordering food.</p>
                </div>
                <div className={classes.step}>
                    <div className={classes['image-container']}>
                        <img src='https://mobi.foodzone.bg/onboarding-3.png' alt='service' />
                    </div>
                    <h3>Fastest Delivery</h3>
                    <p>Delivery that is always ontime <br/> even faster.</p>
                </div>
                <div className={classes.step}>
                    <div className={classes['image-container']}>
                        <img src={mealImg} alt='service' />
                    </div>
                    <h3>Best Quality</h3>
                    <p>Not only fast for us quality is <br/> also number one.</p>
                </div>
            </ul>
        </div>
    )
}
export default OurService