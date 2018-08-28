import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import { ShoppingList } from './ShoppingList';

// const mockStore = configureStore();
// const initialState = {
//   items: [],
//   loading: false
// }

// const store = mockStore(initialState);
const mockgetItemsfn = jest.fn();
const mockdeleteItemfn = jest.fn();
const items = [{_id: '1', name: 'Milk'}];
// Component Renders
describe('<ShoppingList />', () => {

  const wrapper = shallow(<ShoppingList items={items} getItems={mockgetItemsfn} deleteItem={mockdeleteItemfn} />);
  describe('render()', () => {

    test('renders the component', () => {

      expect(toJson(wrapper)).toMatchSnapshot();

    });

    test('componentDidMount()', () => {

      wrapper.instance().componentDidMount();
      expect(mockgetItemsfn).toHaveBeenCalled();

    });
  });


  describe('OnClick()', () => {
    // const wrapper = shallow(<ShoppingList items={items} getItems={mockgetItemsfn} deleteItem={mockdeleteItemfn} />);
    test('call onDeleteClick()', () => {

      wrapper.find('Button').simulate('click')
      expect(mockdeleteItemfn).toHaveBeenCalledTimes(1);
      
    });




    // });
  });
});


