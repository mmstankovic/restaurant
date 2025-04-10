import classes from './Testimonials.module.css'

const Testimonials = () => {
    return (
        <div className={classes.testimonials}>
            <p className='heading'>OUR REVIEWS</p>
            <h2>What They Say?</h2>
            <ul className={classes['testimonials-list']}>
                <li className={classes['testimonial-card']}>
                    <img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Customer" className={classes['testimonial-img']} />
                    <blockquote>
                        <p>"⭐⭐⭐⭐⭐ – 'The best pizza I’ve ever had! Fresh, hot, and packed with flavor. Will definitely order again!'"</p>
                    </blockquote>
                    <div>
                        <cite>— Eleanor M., Culinary Enthusiast</cite>
                    </div>
                </li>
                <li className={classes['testimonial-card']}>
                    <img src="https://images.pexels.com/photos/12024006/pexels-photo-12024006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Customer" className={classes['testimonial-img']} />
                    <blockquote>
                        <p>"A delightful experience from start to finish. Excellent customer service and mouthwatering food. Highly recommend!"</p>
                    </blockquote>
                    <div>
                        <cite>— Olivia K., Food Explorer</cite>
                    </div>
                </li>
                <li className={classes['testimonial-card']}>
                    <img src="https://img.freepik.com/premium-photo/handsome-hispanic-man-wearing-casual-clothes-looking-side-relax-profile-pose-with-natural-face_660230-14711.jpg" alt="Customer" className={classes['testimonial-img']} />
                    <blockquote>
                        <p>"It feels like home here. You can taste the love in every dish, and the staff always makes us feel like family. It’s more than just a meal; it’s an experience."</p>
                    </blockquote>
                    <div>
                        <cite>— Marta and David, Longtime Patrons</cite>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default Testimonials