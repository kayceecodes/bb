//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import cart_reducer from './cart_reducer';

export {initialState} from './cart_reducer';

const rootReducer = combineReducers({
    cart: cart_reducer
}); 

export default rootReducer;