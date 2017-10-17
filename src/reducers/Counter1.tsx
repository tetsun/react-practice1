import { Counter1Action } from '../actions/Counter1';
import { Counter1State } from '../types/Counter1';
import { INCREMENT_COUNTER1, DECREMENT_COUNTER1 } from '../constants/Counter1';

const initialState: Counter1State = {
  count: 0,
};

export function counter1(state: Counter1State = initialState, action: Counter1Action): Counter1State {
  switch (action.type) {
    case INCREMENT_COUNTER1:
      return { ...state, count: state.count + 1 };
    case DECREMENT_COUNTER1:
      return { ...state, count: Math.max(0, state.count - 1) };
    default:
      return state;
  }
}
