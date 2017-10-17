import { counter1 } from './Counter1';
import { incrementCounter1, decrementCounter1 } from '../actions/Counter1';
import { Counter1State } from '../types/Counter1';

describe('reducer counter1', () => {

  describe('from initial state', () => {

    it('increment', () => {
      const newState: Counter1State = counter1(undefined, incrementCounter1());
      expect(newState).toEqual({ count: 1 });
    });
    
    it('decrement', () => {
      const newState: Counter1State = counter1(undefined, decrementCounter1());
      expect(newState).toEqual({ count: 0 });
    });
    
  });
  
  describe('from count is 1', () => {
  
    const initialState: Counter1State = { count: 1 };

    it('increment', () => {
      const newState: Counter1State = counter1(initialState, incrementCounter1());
      expect(newState).toEqual({ count: 2 });
    });
    
    it('decrement', () => {
      const newState: Counter1State = counter1(initialState, decrementCounter1());
      expect(newState).toEqual({ count: 0 });
    });
    
  });
});