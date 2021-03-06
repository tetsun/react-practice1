import * as React from 'react';

export interface Props {
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

class Counter1 extends React.Component<Props, Object> {

  render() {
    const { count = 0, onIncrement, onDecrement } = this.props;

    if (count < 0) {
      throw new Error('Counter must not be less than 0');
    }
  
    return (
      <div className="counter1">
        Counter1 = <span className="count">{count}</span>
        <div>
          <button onClick={onDecrement} className="decrementButton">-</button>
          <button onClick={onIncrement} className="incrementButton">+</button>
        </div>
      </div>
    );
  }
}

export default Counter1;
