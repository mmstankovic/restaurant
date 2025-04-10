import { Link } from 'react-router-dom';
import preparingFood from '../../images/chef-preparing.jpeg'
import classes from './Introduction.module.css'

const Introduction = () => {
    return (
        <div className={classes.introduction}>
            <div className={classes['image-container']}>
                <img src={preparingFood} alt='restaurant cooking' />
            </div>
            <div className={classes['text-container']}>
                <h1>Professionalism You Can Taste</h1>
                <p>To place your order, please log in or register.</p>
                <Link to='/menu'>
                    <button>Explore Menu</button>
                </Link>
            </div>
        </div>
    )
}
export default Introduction