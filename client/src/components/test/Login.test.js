import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import { LogIn } from '../LogIn';

const event = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
  }
const mockVerifyUserfn = jest.fn();
const user = [
    {
        email: 'badal2206@gmail.com',
        password: 'iamgame@1010'
    }
];
const classes = { layout: "LogIn-layout-134", paper: "LogIn-paper-135", avatar: "LogIn-avatar-136", form: "LogIn-form-137", submit: "LogIn-submit-138" };

// Component Renders

describe('<Login/>', () => {

    const wrapper = shallow(<LogIn verifyUser={mockVerifyUserfn} user={user} classes={classes}/>);

    describe('render()', () => {

        test('renders login component', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });


    });

    describe('OnEmailChange()', () => {
        test('check validity of user email', () => {
            wrapper.find('WithStyles(Input)').at(0).props().onChange({target: {value:'demo.mail@demo.com'}});
            expect(wrapper.state('email')).toEqual('demo.mail@demo.com');
        });

    });

    describe('OnEmailBlur()', () => {
        test('check validity of user email on BLUR', () => {
            wrapper.find('WithStyles(Input)').at(0).props().onBlur();
            expect(wrapper.state('validEmail')).toEqual(true);
            expect(wrapper.state('validateEmail')).toEqual(true);
        });

    });

    describe('OnPasswordChange()', () => {
        test('check validity of user password', () => {
            wrapper.find('WithStyles(Input)').at(1).props().onChange({target:{value: 'xyz'}});
            expect(wrapper.state('password')).toEqual('xyz');
        });

    });

    describe('onSubmit()', () => {
        test('check validity of user', () => {
            wrapper.find('form').props().onSubmit(event);
            expect(wrapper.state('validEmail')).toEqual(false);
        });

    });
});