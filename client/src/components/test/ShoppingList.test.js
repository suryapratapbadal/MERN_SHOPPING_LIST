import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { ShoppingList } from '../ShoppingList';


const mockgetItemsfn = jest.fn();
const mockdeleteItemfn = jest.fn();
const mockupdateItemfn = jest.fn();
const items = [{ _id: '1', name: 'Milk' }];
const recipes = [];
const classes = { root: "ShoppingList-root-199", nested: "ShoppingList-nested-200", button: "ShoppingList-button-201", textField: "ShoppingList-textField-202" };

// Component Renders
describe('<ShoppingList />', () => {

  const wrapper = shallow(<ShoppingList items={items} recipes={recipes} loading={false} classes={classes} getItems={mockgetItemsfn} deleteItem={mockdeleteItemfn} updateItem={mockupdateItemfn}/>);
  wrapper.setState({ loader: false });
  const event = {
    stopPropagation: jest.fn(),
    target: {
      value: 'dummy'
    }
  }
  describe('render()', () => {

    test('renders the component', () => {

      expect(toJson(wrapper)).toMatchSnapshot();

    });

    test('componentDidMount()', () => {

      wrapper.instance().componentDidMount();
      expect(mockgetItemsfn).toHaveBeenCalled();

    });

    test('componentDidUpdate(prevProps)', () => {

      wrapper.instance().componentDidUpdate({});
      expect(wrapper.state().loader).toEqual(false);

    });


  });

  describe('onDeleteClick()', () => {

    test('works on delete button click', () => {
      wrapper.find('WithStyles(IconButton)').at(0).props().onClick(event);
      expect(mockdeleteItemfn).toBeCalledWith('1');
    });

  });

  describe('onClick()', () => {

    test('toggle the edit item state', () => {
      wrapper.find('pure(EditIcon)').at(0).props().onClick(event);
      expect(wrapper.state('editItem')).toEqual(true);
    });

  });

  describe('onChange()', () => {

    test('changes the checkbox state', () => {
      wrapper.find('WithStyles(Checkbox)').at(0).props().onChange('1',{'completed': true});
      expect(mockupdateItemfn).toBeCalledWith('1',{'completed': true});
    });

  });


  describe('onClick()', () => {

    test('toggle the collapse)', () => {
      wrapper.find('WithStyles(ListItem)').at(0).props().onClick('1');
      expect(wrapper.state('collapse')).toEqual(true);
      expect(wrapper.state('id')).toEqual('1');
    });

  });

});


