import * as constants from '../constants/Counter1';

export interface IncrementCounter1 {
  type: constants.INCREMENT_COUNTER1;
}

export interface DecrementCounter1 {
  type: constants.DECREMENT_COUNTER1;
}

export type Counter1Action = IncrementCounter1 | DecrementCounter1;

export function incrementCounter1(): IncrementCounter1 {
  return {
    type: constants.INCREMENT_COUNTER1
  };
}

export function decrementCounter1(): DecrementCounter1 {
  return {
    type: constants.DECREMENT_COUNTER1
  };
}
