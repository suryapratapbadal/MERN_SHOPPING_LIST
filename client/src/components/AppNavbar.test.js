import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import AppNavbar from './AppNavbar';

// Test to check , Component Renders
describe('<AppNavbar />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<AppNavbar />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});


// Test to check toggle function onClick

describe('<AppNavbar />', () => {
  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      const mockOnClick = jest.fn();
      const wrapper = shallow(
        <AppNavbar />
      );


      const toggleState = wrapper.find('Collapse').props().isOpen;
      wrapper.find('NavbarToggler').simulate('click');

      expect(wrapper.find('Collapse').props().isOpen).toEqual(!toggleState);
    });
  });
});