import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { Root } from '../Root';



// Component Renders

describe('<Root/>', () => {

    const wrapper = shallow(<Root user={false} loading={false}/>);

    describe('render()', () => {

        test('renders login component', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });


    });
});