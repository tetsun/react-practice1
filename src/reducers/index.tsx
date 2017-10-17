import { combineReducers } from 'redux';
import { counter1 } from './Counter1';
import { counter2 } from './Counter2';

const reducer = combineReducers({
  counter1,
  counter2,
});

export default reducer;
