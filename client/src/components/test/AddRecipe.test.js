import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { AddRecipe } from '../AddRecipe';


const mockupdatefn = jest.fn();
const classes = {
    button: {},
    textField: '',
};

// Component Renders
describe('<AddRecipe />', () => {

    const wrapper = shallow(<AddRecipe updateItem={mockupdatefn} item_id={'1'} classes={classes}/>);
    const event = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target: {
            value: 'dummy'
        }
    }
    describe('render()', () => {

        test('renders the component', () => {

            expect(toJson(wrapper)).toMatchSnapshot();

        });
    });


    describe('onChange()',()=>{
        test('handle changing text field',()=>{
            wrapper.find('TextField').props().onChange(event);
            expect(wrapper.state('name')).toEqual('dummy');
        });
    });

    describe('onSubmit()',()=>{
        test('handle add recipe',()=>{
            wrapper.find('Form').props().onSubmit(event);
            expect(wrapper.state('name')).toEqual('');
            expect(mockupdatefn).toHaveBeenCalled();

        });
    });
});