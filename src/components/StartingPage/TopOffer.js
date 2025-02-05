import { useState, useEffect } from 'react'
import pastaImg from '../../images/pasta.png'
import beefImg from '../../images/beef-steak.png'
import burgerImg from '../../images/burger.png'
import pizzaImg from '../../images/pizza.jpeg'
import classes from './TopOffer.module.css'

const images = [
    { id: 'f1', title: 'Classic Spaghetti Bolognese', image: pastaImg },
    { id: 'f2', title: 'Juicy Ribeye Steak', image: beefImg },
    { id: 'f3', title: 'Juicy Gourmet Burger', image: burgerImg },
    { id: 'f4', title: 'Authentic Napoletana Pizza', image: pizzaImg },
]

const TopOffer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible(false)
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            const fadeInTimer = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsVisible(true);
            }, 500);

            return () => clearTimeout(fadeInTimer);
        }
    }, [isVisible]);

    return (
        <div className={classes['top-offer']}>
            <p>TOP OFFER</p>
            <h2>The Most Popular Food</h2>
            <div className={classes['grid-container']}>
                <div className={classes['text-container']}>
                    <h1>Unforgettable Flavors</h1>
                    <h3>Every dish is an explosion of taste, carefully designed to satisfy your cravings. Ready for your next food adventure?</h3>
                </div>
                <div className={classes['slider']}>
                    <img className={`${classes['slider-image']} ${isVisible ? classes['fade-in'] : ''}`} src={images[currentIndex].image} alt='food' />
                    <div className={classes['slider-text']}>{images[currentIndex].title}</div>
                </div>
            </div>
        </div>
    )
}
export default TopOffer