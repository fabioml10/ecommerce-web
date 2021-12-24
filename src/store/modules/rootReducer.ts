import { combineReducers } from 'redux'
import auth from './auth/reducer'
import search from './admin/shared/search/reducer'
import category from './admin/category/reducer'

export default combineReducers({
  auth,
  search,
  category
})
