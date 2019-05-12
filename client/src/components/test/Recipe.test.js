import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { Recipe } from '../Recipe';

const mockupdateRecipefn = jest.fn();
const recipes = [{ _id: '1', name: 'Tea' }];
const classes = {
    root: {},
    nested: {},
};
const id ='1';

describe('<Recipe />', () => {

    const wrapper = shallow(<Recipe recipes={recipes} classes={classes} updateItem={mockupdateRecipefn} id={id} loading={false}/>);
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
    });

    
    describe('onClick()',()=>{
        test('Delete recipe item',()=>{
            wrapper.find('WithStyles(Chip)').props().onDelete(event);
            expect(mockupdateRecipefn).toHaveBeenCalled();
        });
    });


    
});