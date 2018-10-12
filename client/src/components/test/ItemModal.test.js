import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ItemModal } from '../ItemModal';


const mockaddItemfn = jest.fn();
const classes = {
  button: {},
  form: {},
  paper: {},
  rightIcon: {},
  root: {},
  submit: {},
  tittle: {},
}

const event = {
  preventDefault: jest.fn(),
  target: {
    value: 'Demo'
  }
};

// Component Renders
describe('<ItemModal />', () => {

  const wrapper = shallow(<ItemModal addItem={mockaddItemfn} classes={classes} loading={false} />);
  describe('render()', () => {
    test('renders the component', () => {

      expect(toJson(wrapper)).toMatchSnapshot();

    });
  });


  describe('onClick()', () => {
    test('successfully calls the onClick handler on Add button', () => {

      wrapper.find('WithStyles(Button)').at(0).props().onClick();

      expect(wrapper.state('modal')).toEqual(true);
    });
  });

  describe('OnChange()', () => {
    test('handle the change of text field value', () => {
      wrapper.find('WithStyles(Input)').props().onChange(event);
      expect(wrapper.state('name')).toEqual('Demo');
    });
  });

  describe('OnSubmit()',()=> {
    test('submitts the form',()=> {
      wrapper.find('form').props().onSubmit(event);
      expect(mockaddItemfn).toBeCalledWith({'name': wrapper.state('name')});
      expect(wrapper.state('modal')).toEqual(false);
    });
  });


});