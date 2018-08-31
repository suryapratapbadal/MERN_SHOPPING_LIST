import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
    FormFeedback,
    FormText
} from 'reactstrap';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validEmail: true,
            validPassword: true,
            validate: false,
            email: '',
            password: '',
            emailMessage: '',
        };
    }

    onEmailChange = event => {
        const email = event.target
        console.log('Email changed', event.target.value);
    }

    onPasswordChange = event => {
        console.log('Password changed', event);
    }

    onInputBlur = () => {

    }


    render() {
        return (
            <Container style={logInStyle}>
                <h2>Sign In</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                valid={this.state.validate && this.state.validEmail}
                                invalid={this.state.validate && !this.state.validEmail}
                                onChange={this.onEmailChange}
                                onBlur={this.onInputBlur}
                            />
                            <FormFeedback>{this.state.emailMessage}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                valid={this.state.validate && this.state.validPassword}
                                invalid={this.state.validate && !this.state.validPassword}
                                onChange={this.onPasswordChange}
                                onBlur={this.onInputBlur}
                            />
                            <FormFeedback>Password can't be left blank</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Button disabled={this.state.validEmail && this.state.validPassword}>Submit</Button>
                </Form>
            </Container>
        );
    }
}

const logInStyle = {
    textAlign: 'left',
    padding: '1em',
    margin: '1em',
    border: '2px solid #d3d3d3',
    borderRadius: '.5em',
    verticalAlign: 'middle',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '600px',
    marginTop: '100px',
}
