import { counter2 } from './Counter2';
import { incrementCounter2, decrementCounter2 } from '../actions/Counter2';
import { Counter2State } from '../types/Counter2';

describe('reducer counter2', () => {

  describe('from initial state', () => {

    it('increment', () => {
      const newState: Counter2State = counter2(undefined, incrementCounter2());
      expect(newState).toEqual({ count: 1 });
    });
    
    it('decrement', () => {
      const newState: Counter2State = counter2(undefined, decrementCounter2());
      expect(newState).toEqual({ count: 0 });
    });
    
  });
  
  describe('from count is 1', () => {
  
    const initialState: Counter2State = { count: 1 };

    it('increment', () => {
      const newState: Counter2State = counter2(initialState, incrementCounter2());
      expect(newState).toEqual({ count: 2 });
    });
    
    it('decrement', () => {
      const newState: Counter2State = counter2(initialState, decrementCounter2());
      expect(newState).toEqual({ count: 0 });
    });
    
  });
});