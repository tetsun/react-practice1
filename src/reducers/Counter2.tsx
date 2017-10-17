import { Counter2Action } from '../actions/Counter2';
import { Counter2State } from '../types/Counter2';
import { INCREMENT_COUNTER2, DECREMENT_COUNTER2 } from '../constants/Counter2';

const initialState: Counter2State = {
  count: 0,
};

export function counter2(state: Counter2State = initialState, action: Counter2Action): Counter2State {
  switch (action.type) {
    case INCREMENT_COUNTER2:
      return { ...state, count: state.count + 1 };
    case DECREMENT_COUNTER2:
      return { ...state, count: Math.max(0, state.count - 1) };
    default:
      return state;
  }
}
