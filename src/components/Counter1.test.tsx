import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Counter1 from './Counter1';

enzyme.configure({ adapter: new Adapter() });

describe('<Counter1 />', () => {

  it('renders the correct text when no count is given', () => {
    const c1 = enzyme.shallow(<Counter1 />);
    expect(c1.find('.count').text()).toEqual('0');
  });

  it('renders the correct text with an explicit count of 0', () => {
    const c1 = enzyme.shallow(<Counter1 count={0} />);
    expect(c1.find('.count').text()).toEqual('0');
  });

  it('renders the correct text with an explicit count of 1', () => {
    const c1 = enzyme.shallow(<Counter1 count={1} />);
    expect(c1.find('.count').text()).toEqual('1');
  });

  it('renders the correct text with an explicit count of 5', () => {
    const c1 = enzyme.shallow(<Counter1 count={5} />);
    expect(c1.find('.count').text()).toEqual('5');
  });

  it('throws when the count is negative', () => {
    expect(() => {
      enzyme.shallow(<Counter1 count={-1} />);
    }).toThrow();
  });
  
});
