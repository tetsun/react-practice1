公式URL
=======
https://github.com/Microsoft/TypeScript-React-Starter

初期設定
========
1. Initialize
```bash
create-react-app react-practice1 --scripts-version=react-scripts-ts
```

2. Install additional packages
```bash
npm i -S redux react-redux redux-thunk redux-logger
npm i -D enzyme enzyme-adapter-react-16 react-addons-test-utils react-test-renderer ts-jest
npm i -D @types/enzyme @types/enzyme-adapter-react-16 @types/react-redux @types/redux-logger
```

3. Edit package.json
```bash
    "test": "react-scripts-ts test --env=jsdom --setupTestFrameworkScriptFile=raf/polyfill",
```

4. Directory structure of src
```bash
mkdir -p src/{actions,components,constants,containers,reducers,types}
rm src/{App.tsx,App.test.tsx,App.css,registerServiceWorker.ts}
```

Example
```bash
tree src
src
├── actions
│   ├── Counter1.tsx
│   └── Counter2.tsx
├── components
│   ├── Counter1.test.tsx
│   ├── Counter1.tsx
│   ├── Counter2.test.tsx
│   └── Counter2.tsx
├── constants
│   ├── Counter1.tsx
│   └── Counter2.tsx
├── containers
│   ├── Counter1.test.tsx
│   ├── Counter1.tsx
│   ├── Counter2.test.tsx
│   └── Counter2.tsx
├── index.css
├── index.tsx
├── logo.svg
├── reducers
│   ├── Counter1.test.tsx
│   ├── Counter1.tsx
│   ├── Counter2.test.tsx
│   ├── Counter2.tsx
│   └── index.tsx
└── types
    ├── Counter1.tsx
    ├── Counter2.tsx
    └── index.tsx
```

構築
====
## types
- `State`のInterfaceを定義する
types/Counter1.tsx
```typescript
export interface Counter1State {
  count: number,
}
```

types/index.tsx
```typescript
import { Counter1State } from './Counter1';

export interface State {
  counter1: Counter1State;
}
```

## constants
- 定数定義をする
- Actionsが返す値

constants/Counter1.tsx
```typescript
export const INCREMENT_COUNTER1 = 'INCREMENT_COUNTER1';
export type INCREMENT_COUNTER1 = typeof INCREMENT_COUNTER1;

export const DECREMENT_COUNTER1 = 'DECREMENT_COUNTER1';
export type DECREMENT_COUNTER1 = typeof DECREMENT_COUNTER1;
```

## actions
- Actionを定義する

actions/Counter1.tsx
```typescript
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
```

## components
- `Props`を受け取って、`JSX`を返す
- `State`を維持しない

components/Counter1.tsx
```typescript
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
```

## containers
- `component`と`action`を繋ぐ
- `manStateToProps`関数と`mapDispatchToState`関数を定義し、`connect`を使って繋ぎこむ

containers/Counter1.tsx
```typescript
import Counter1, { Props } from '../components/Counter1';
import * as actions from '../actions/Counter1';
import { State } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ counter1: state }: State): Props {
  return {
    count: state.count,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Counter1Action>): Props {
  return {
    onIncrement: () => dispatch(actions.incrementCounter1()),
    onDecrement: () => dispatch(actions.decrementCounter1()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter1);
```

## reducers
- `state`と`action`を受け取って、新しく作った`state`を返す純関数

reducers/Counter1.tsx
```typescript
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
```

reducers/index.tsx
```typescript
import { combineReducers } from 'redux';
import { counter1 } from './Counter1';

const reducer = combineReducers({
  counter1,
});

export default reducer;
```

## index.tsx
- アプリケーションをマウントする
- `redux-thunk`は Async actions を利用する際に必要
- `redux-logger`を使うと`state`が更新される度にconsoleにloggingされる

index.tsx
```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import Counter1 from './containers/Counter1';
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <Counter1 />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
```
