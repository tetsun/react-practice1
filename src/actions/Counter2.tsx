import * as constants from '../constants/Counter2';

export interface IncrementCounter2 {
  type: constants.INCREMENT_COUNTER2;
}

export interface DecrementCounter2 {
  type: constants.DECREMENT_COUNTER2;
}

export type Counter2Action = IncrementCounter2 | DecrementCounter2;

export function incrementCounter2(): IncrementCounter2 {
  return {
    type: constants.INCREMENT_COUNTER2
  };
}

export function decrementCounter2(): DecrementCounter2 {
  return {
    type: constants.DECREMENT_COUNTER2
  };
}
