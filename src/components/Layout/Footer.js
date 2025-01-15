import { Link } from 'react-router-dom'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes['footer-content']}>
                {/* About Section */}
                <div className={classes['footer-section']}>
                    <h4>About Us</h4>
                    <p className={classes.about}>We serve delicious meals made with fresh ingredients.<br/> Whether you’re looking for a quick bite or a family dinner, we have something for everyone!</p>
                </div>
                {/* Contact Section */}
                <div className={classes['footer-section']}>
                    <h4>Contact</h4>
                    <p>123 Tasty Street, Flavor Town</p>
                    <p>+1 234 567 890</p>
                    <p>info@deliciousrestaurant.com</p>
                </div>
                {/* Quick Links Section */}
                <div className={classes['footer-section']}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/auth">Login</Link></li>
                    </ul>
                </div>
            </div>
             {/* Copyright Section */}
            <div className={classes['footer-bottom']}>
                <p>&copy; 2025 Delicious Restaurant. All Rights Reserved.</p>
            </div>
            <div className={classes['footer-waves']}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" ><path  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill" fill="#FFFFFF" fill-opacity="1"></path></svg>
            </div>
        </div>
    )
}
export default Footer