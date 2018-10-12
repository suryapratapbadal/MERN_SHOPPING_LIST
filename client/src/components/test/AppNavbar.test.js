import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { AppNavbar } from '../AppNavbar';


const classes = {
  root: {},
  grow: {},
  menuButton: {},
}
const mocklogOutUserfn = jest.fn();
const mockchangeThemefn = jest.fn();

const user = false;

// Test to check , Component Renders
describe('<AppNavbar />', () => {

  const wrapper = shallow(<AppNavbar user={user} logOutUser={mocklogOutUserfn} classes={classes} changeTheme={mockchangeThemefn}/>);

  describe('render()', () => {
    test('renders the component', () => {

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('OnChange()', ()=> {
    test('toggles switch', ()=> {
      wrapper.find('WithStyles(Switch)').props().onChange();
      expect(mockchangeThemefn).toHaveBeenCalled();
      expect(wrapper.state('dark')).toEqual(true);
    });
  });

  describe('onClick()', ()=> {
    test('logs out the user', ()=>{
      wrapper.find('WithStyles(Button)').props().onClick();
      expect(mocklogOutUserfn).toHaveBeenCalled();
    });
  });
});
