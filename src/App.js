import { useState, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartSliceActions } from './ridaks/cart-slice';
import AuthContext from './store/auth-context'
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import MealsPage from './pages/MealsPage'
import Cart from './components/Cart/Cart';
import MealDetailsPage from './pages/MealDetailsPage'

let isInitial = true

function App() {
  const authCtx = useContext(AuthContext)

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCartData = async () => {
      setError(null)
      const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/cart.json`)

      if(!response.ok) {
        throw new Error('Fetching cart data failed!')
      }

      const data = await response.json()

      dispatch(cartSliceActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.totalQuantity,
        totalAmount: data.totalAmount
      }))

    }

    fetchCartData().catch(error => {
      setError(error.message)
    })
  }, [dispatch])

  useEffect(() => {
    const sendCartData = async () => {
      setError(null)
      const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/cart.json`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount
        })
      })
      if(!response.ok) {
        throw new Error('Sending cart data failed')
      }
    }

    if(isInitial) {
      isInitial = false 
      return 
    }

    if(cart.changed) {
      sendCartData().catch(error => {
        setError(error.message)
      })
    }
   
  }, [cart])
  
  return (
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
        {!authCtx.isLoggedIn && <Route path='/auth'>
            <AuthPage />
          </Route>}
          <Route path='/profile'>
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth"/>}
          </Route>
          <Route path='/menu'>
            <MealsPage />
          </Route>
          <Route path='/meal-details/:id'>
            <MealDetailsPage />
          </Route>
          <Route path="/cart">
            <Cart error={error}/>
          </Route>
          <Route path='*'>
              <Redirect to="/"/>
          </Route>
        </Switch>
      </Layout>
  );
}
export default App;