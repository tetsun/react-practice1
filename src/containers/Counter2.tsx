import Counter2 from '../components/Counter2';
import * as actions from '../actions/Counter2';
import { State } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ counter2: state }: State) {
  return {
    count: state.count,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Counter2Action>) {
  return {
    onIncrement: () => dispatch(actions.incrementCounter2()),
    onDecrement: () => dispatch(actions.decrementCounter2()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter2);
