import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import CartButton from '../Cart/CartButton';
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
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
      <div className={classes['header-container']}>
        <Link to='/'>
          <div className={classes.logo}>Wilma ristorante</div>
        </Link>
        <button className={classes.menuButton} onClick={toggleMenuHandler}>
          {isOpen ? <RiCloseFill /> : <RiMenu3Fill />}
        </button>
        <nav className={`${classes.menu} ${isOpen ? classes.isOpen : ''}`}>
          <ul>
            <li onClick={closeMobileMenu}>
              <Link to='/'>HOME</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to='/menu'>MENU</Link>
            </li>
            {!authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
              <Link to='/auth'>LOGIN</Link>
            </li>}
            {authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
              <Link to='/profile'>PROFILE</Link>
            </li>}
            {authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
              <Link to='/cart'><CartButton totalQuantity={totalQuantity}/></Link>
            </li>}
            {authCtx.isLoggedIn && <li onClick={closeMobileMenu}>
              <button onClick={logoutUserHandler}>LOGOUT</button>
            </li>}
          </ul>
        </nav>
      </div>
     <Wave />
    </header>
  );
};
export default Header;