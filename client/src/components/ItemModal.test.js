import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
// import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import { ItemModal } from './ItemModal';

// const mockStore = configureStore();
// const initialState = {
//   items: [],
//   loading: false
// }

// const store = mockStore(initialState);

// Component Renders
describe('<ItemModal />', () => {
  const mockaddItemfn = jest.fn();

  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ItemModal addItem={mockaddItemfn} />);
      expect(toJson(wrapper)).toMatchSnapshot();

    });
  });
});


describe('<ItemModal />', () => {
  const mockaddItemfn = jest.fn();
  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      const wrapper = shallow(<ItemModal addItem={mockaddItemfn} />);
      const mockOnClick = jest.fn();
      const toggleState = wrapper.find('Modal').props().isOpen;
      wrapper.find('Button').at(0).simulate('click');

      expect(wrapper.find('Modal').props().isOpen).toEqual(!toggleState);
    });
  });

  describe('onChange()', () => {
    test('successfully calls the onChange handler', () => {
      const wrapper = shallow(<ItemModal addItem={mockaddItemfn} />);
      const mockOnChange = jest.fn();
      const input = wrapper.find('Input');

      input.props().onChange({
        target: {
          name: 'myName',
          value: 'myValue'
        }
      });
      // wrapper.find('Input').simulate('change', event);

      expect(wrapper.state('name')).toEqual('myValue');
    });

  });


  describe('onSubmit()', () => {
    test('successfully calls the onSubmit handler', () => {
      const wrapper = shallow(<ItemModal addItem={mockaddItemfn} />);
      const mockOnSubmitfn = jest.fn();
      const mockpreventDefaultfn = jest.fn()
      const form = wrapper.find('Form');
      const newItem = {
        name: 'Eggs'
      };


      wrapper.find('Form').simulate('submit', { preventDefault: () => { } });

      expect(mockaddItemfn).toHaveBeenCalledTimes(1);
    });

  });

});