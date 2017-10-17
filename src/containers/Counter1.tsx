import Counter1 from '../components/Counter1';
import * as actions from '../actions/Counter1';
import { State } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ counter1: state }: State) {
  return {
    count: state.count,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Counter1Action>) {
  return {
    onIncrement: () => dispatch(actions.incrementCounter1()),
    onDecrement: () => dispatch(actions.decrementCounter1()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter1);
