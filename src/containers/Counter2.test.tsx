import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter2 from './Counter2';
import reducer from '../reducers';

enzyme.configure({ adapter: new Adapter() });

const store = createStore(reducer);

describe('<Counter2 />', () => {

  const c1 = enzyme.mount(<Provider store={store}><Counter2 /></Provider>);
  
  it('count is 0 when initialized', () => {
    expect(c1.find('.count').text()).toEqual('0');
  });
  
  it('change 0 to 0 when clicking decrement button', () => {
    c1.find('.decrementButton').simulate('click');
    expect(c1.find('.count').text()).toEqual('0');
  });
  
  it('change 0 to 1 when clicking increment button', () => {
    c1.find('.incrementButton').simulate('click');
    expect(c1.find('.count').text()).toEqual('1');
  });

  it('change 1 to 2 when clicking increment button', () => {
    c1.find('.incrementButton').simulate('click');
    expect(c1.find('.count').text()).toEqual('2');
  });
  
  it('change 2 to 1 when clicking decrement button', () => {
    c1.find('.decrementButton').simulate('click');
    expect(c1.find('.count').text()).toEqual('1');
  });
  
});
