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
npm i -S redux react-redux
npm i -D enzyme enzyme-adapter-react-16 react-addons-test-utils react-test-renderer ts-jest
npm i -D @types/enzyme @types/enzyme-adapter-react-16 @types/react-redux
```

3. Edit package.json
```bash
    "test": "react-scripts-ts test --env=jsdom --setupTestFrameworkScriptFile=raf/polyfill",
```

4. Directory structure of src
```bash
tree src

src
├── actions
│   └── index.tsx
├── components
│   ├── Hello.css
│   ├── Hello.test.tsx
│   └── Hello.tsx
├── constants
│   └── index.tsx
├── containers
│   └── Hello.tsx
├── index.css
├── index.tsx
├── logo.svg
├── reducers
│   ├── index.test.tsx
│   └── index.tsx
├── registerServiceWorker.ts
└── types
    └── index.tsx
```

構築
====
## types
- `State`のInterfaceを定義する

```types/index.tsx
export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}
```

## constants
- 定数定義をする
- Actionsが返す値

```constants/index.tsx
export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;
```

## actions
- Actionを定義する

```actions/index.tsx
import * as constants from '../constants';

export interface IncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: constants.INCREMENT_ENTHUSIASM
  };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM
  };
}
```

## components
- `Props`を受け取って、`JSX`を返す
- `State`を維持しない

```components/Hello.tsx
import * as React from 'react';
import './Hello.css';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more ethusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
```

## containers
- `component`と`action`を繋ぐ
- `manStateToProps`関数と`mapDispatchToState`関数を定義し、`connect`を使って繋ぎこむ

```containers/Hello.tsx
import Hello from '../components/Hello';
import * as actions from '../actions';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
```

## reducers
- `state`と`action`を受け取って、新しく作った`state`を返す純関数

```reducers/index.tsx
import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}
```

Tips
====
## 複数のreducerを作る場合
- `combineReducers`を利用する
- containersで定義している`mapStateToProps`で、引数の`state`が変わるため修正が必要
