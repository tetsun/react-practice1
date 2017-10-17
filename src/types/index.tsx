import { Counter1State } from './Counter1';
import { Counter2State } from './Counter2';

export interface State {
  counter1: Counter1State;
  counter2: Counter2State;
}
