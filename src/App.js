import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ReactContext from './components/ReactContext'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import OrderSuccess from './components/OrderSuccess'
import CartView from './components/CartView'
import './App.css'

const getCartList = () => {
  const cartList = localStorage.getItem('cartData')
  const parsedList = JSON.parse(cartList)
  if (parsedList === null) {
    return []
  }
  return parsedList
}

class App extends Component {
  state = {
    showMenu: false,
    cartList: getCartList(),
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  onClickDelete = id => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCart})
  }

  onClickDecrease = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === id)
    if (item.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.onClickDelete(id)
    }
  }

  onClickIncrease = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const updatedQuantity = each.quantity + 1
          return {...each, quantity: updatedQuantity}
        }
        return each
      }),
    }))
  }

  onAddFoodItem = foodItem => {
    const {cartList} = this.state
    const updatedItem = {...foodItem, quantity: 1}
    const updatedCart = [...cartList, updatedItem]
    this.setState({cartList: updatedCart})
  }

  render() {
    const {showMenu, cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <ReactContext.Provider
        value={{
          showMenu,
          onClickMenu: this.onClickMenu,
          onAddItem: this.onAddFoodItem,
          onDeleteItem: this.onClickDelete,
          cartListItems: cartList,
          onIncreaseQuantity: this.onClickIncrease,
          onDecreaseQuantity: this.onClickDecrease,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute
            exact
            path="/order-success"
            component={OrderSuccess}
          />
          <ProtectedRoute exact path="/cart" component={CartView} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
