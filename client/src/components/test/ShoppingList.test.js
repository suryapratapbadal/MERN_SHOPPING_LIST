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


});


