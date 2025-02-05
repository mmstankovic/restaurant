import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import CartButton from '../Cart/CartButton';
import classes from './Header.module.css';
import Wave from './Wave'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const authCtx = useContext(AuthContext)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const toggleMenuHandler = () => {
    setIsOpen((prevState) => !prevState)
  }

  const closeMobileMenu = () => setIsOpen(false)

  const logoutUserHandler = () => {
    authCtx.logout()
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>We deliver</div>
      </Link>
      <button className={classes.menuButton} onClick={toggleMenuHandler}>
        ☰
      </button>
      <nav className={`${classes.menu} ${isOpen ? classes.isOpen : ''}`}>
        <ul>
          <li onClick={closeMobileMenu}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link to='/menu'>Menu</Link>
          </li>
          {!authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
            <Link to='/auth'>Login</Link>
          </li>}
          {authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
            <Link to='/profile'>Profile</Link>
          </li>}
          <li onClick={closeMobileMenu}>
            <Link to='/cart'><CartButton totalQuantity={totalQuantity}/></Link>
          </li>
          {authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
            <button onClick={logoutUserHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
     <Wave />
    </header>
  );
};
export default Header;