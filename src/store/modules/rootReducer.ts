import { combineReducers } from 'redux'
import auth from './auth/reducer'
import search from './admin/shared/search/reducer'
import category from './admin/category/reducer'
import product from './admin/product/reducer'
import cartProducts from './storefront/cartProducts/reducer'
import dashboard from './admin/dashboard/reducer'

export default combineReducers({
  auth,
  search,
  category,
  product,
  cartProducts,
  dashboard
})
