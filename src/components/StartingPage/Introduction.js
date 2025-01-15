import { Link } from 'react-router-dom';
import classes from './Introduction.module.css'

const Introduction = () => {
    return (
        <div className={classes.introduction}>
            <div className={classes['image-container']}>
                <img src='https://static.vecteezy.com/system/resources/previews/033/692/644/large_2x/chef-preparing-food-in-the-kitchen-at-the-restaurant-professional-chef-cooking-gourmet-chef-cooking-in-a-commercial-kitchen-ai-generated-free-photo.jpg' alt='restaurant cooking' />
            </div>
            <div className={classes['text-container']}>
                <h1>Professionalism You Can Taste</h1>
                <h3>To place your order, please log in or register.</h3>
                <Link to='/menu'>
                    <button>Explore Menu</button>
                </Link>
            </div>
        </div>
    )
}
export default Introduction