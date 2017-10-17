import * as React from 'react';

export interface Props {
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Counter2({ count = 0, onIncrement, onDecrement }: Props) {
  if (count < 0) {
    throw new Error('Counter must not be less than 0');
  }
  
  return (
    <div className="counter2">
      Counter2 = <span className="count">{count}</span>
      <div>
        <button onClick={onDecrement} className="decrementButton">-</button>
        <button onClick={onIncrement} className="incrementButton">+</button>
      </div>
    </div>
  );
}

export default Counter2;
