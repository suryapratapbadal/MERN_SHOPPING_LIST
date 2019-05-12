import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { Item } from '../Item';


const mockupdatefn = jest.fn();
const recipes = [{ _id: '1', name: 'Tea' }];
const classes = {
    listItem: {
       
    },
    listItemDeactivate: {
        
    },
    button: {
        
    },
    textField: {
        
    }
};
const id ='1';


// Component Renders
describe('<Item />', () => {

    const wrapper = shallow(<Item recipes={recipes} classes={classes} updateItem={mockupdatefn} loading={false} _id={id} completed={false}/>);
    const event = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target: { value : 'dummy'}
    }
    describe('render()', () => {

        test('renders the component', () => {

            expect(toJson(wrapper)).toMatchSnapshot();

        });
    });


    describe('onChange()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(Checkbox)').props().onChange();
            expect(wrapper.state('selected')).toEqual(true);
        });
    });

    // describe('onChange()',()=>{
    //     test('handle click on button',()=>{
    //         wrapper.find('WithStyles(TextField)').at(0).props().onChange(event);
    //         expect(wrapper.state('itemName')).toEqual('dummy');
    //     });
    // });

    // describe('onClose()',()=>{
    //     test('handle click on button',()=>{
    //         wrapper.find('WithStyles(Menu)').props().onClose();
    //         expect(wrapper.state('anchorEl')).toEqual(null);
    //     });
    // });

    describe('onClick()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(IconButton)').at(0).props().onClick(event);
            expect(wrapper.state('editItem')).toEqual(true);
        });
    });
});