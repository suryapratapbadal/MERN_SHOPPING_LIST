import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { Recipe } from '../Recipe';

const mockgetRecipessfn = jest.fn();
const mockdeleteRecipefn = jest.fn();
const mockonEnteringfn = jest.fn();
const recipes = [{ _id: '1', name: 'Tea' }];
const classes = {
    root: {},
    nested: {},
};
const id ='1';

describe('<Recipe />', () => {

    const wrapper = shallow(<Recipe recipes={recipes} classes={classes} deleteRecipe={mockdeleteRecipefn} getRecipes={mockgetRecipessfn} onEntering={mockonEnteringfn} open_id={id} id={id} collapse={true}/>);
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
            wrapper.find('WithStyles(IconButton)').props().onClick(event);
            expect(mockdeleteRecipefn).toHaveBeenCalled();
        });
    });

    describe('onEntring()', () => {
        test('set loader to true and calls to getRecipes()', () => {
            wrapper.find('Collapse').props().onEntering();
            expect(wrapper.state('loader')).toEqual(true);
            expect(mockgetRecipessfn).toHaveBeenCalled();
        });
    });

    
});