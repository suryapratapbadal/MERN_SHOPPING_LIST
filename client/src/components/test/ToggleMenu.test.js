import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { ToggleMenu } from '../ToggleMenu';


const mockupdatefn = jest.fn();
const toggleDeleteConfirmationDialoguefn = jest.fn();
const id = '1';


// Component Renders
describe('<ToggleMenu />', () => {

    const wrapper = shallow(<ToggleMenu updateItem={mockupdatefn} loading={false} toggleDeleteConfirmationDialogue={toggleDeleteConfirmationDialoguefn} id={id} completed={false}/>);
    const event = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        currentTarget: 'dummy'
    }
    describe('render()', () => {

        test('renders the component', () => {

            expect(toJson(wrapper)).toMatchSnapshot();

        });
    });


    describe('onClick()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(IconButton)').props().onClick(event);
            expect(wrapper.state('anchorEl')).toEqual('dummy');
        });
    });

    describe('onClose()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(Menu)').props().onClose();
            expect(wrapper.state('anchorEl')).toEqual(null);
        });
    });

    describe('onClick()',()=>{
        test('handle click on button',()=>{
            wrapper.find('WithStyles(MenuItem)').at(0).props().onClick('Done');
            expect(wrapper.state('anchorEl')).toEqual(null);
        });
    });
});