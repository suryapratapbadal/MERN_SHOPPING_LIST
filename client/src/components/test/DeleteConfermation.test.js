import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { DeleteConfermation } from '../DeleteConfermation';


const mockdeletefn = jest.fn();
const toggleDeleteConfirmationfn = jest.fn();
const id ='1';


// Component Renders
describe('<DeleteConfermation />', () => {

    const wrapper = shallow(<DeleteConfermation deleteItem={mockdeletefn} _id={id} toggleDeleteConfirmation={toggleDeleteConfirmationfn}/>);
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


    // describe('onChange()',()=>{
    //     test('handle click on button',()=>{
    //         wrapper.find('WithStyles(Checkbox)').props().onChange();
    //         expect(wrapper.state('selected')).toEqual(true);
    //     });
    // });

    // describe('onChange()',()=>{
    //     test('handle click on button',()=>{
    //         wrapper.find('WithStyles(TextField)').at(0).props().onChange(event);
    //         expect(wrapper.state('itemName')).toEqual('dummy');
    //     });
    // });

    describe('onClose()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(Dialog)').props().onClose();
            expect(wrapper.state('open')).toEqual(false);
        });
    });

    describe('onClick()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(Button)').at(1).props().onClick();
            expect(wrapper.state('open')).toEqual(false);
        });
    });
});