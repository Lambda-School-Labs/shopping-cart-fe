import { combineReducers } from 'redux'
import { formReducer } from './formReducer'
import { userReducer } from './userReducer'
import { storeReducer } from './storeReducer'
import { cartReducer } from './cartReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  store: storeReducer,
  cart: cartReducer
})

export default rootReducer
