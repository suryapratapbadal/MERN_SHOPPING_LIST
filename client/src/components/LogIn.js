import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
    FormFeedback
} from 'reactstrap';
import { verifyUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validEmail:false,
            validPassword: false,
            validateEmail: false,
            validatePass: false,
            email: '',
            password: '',
            emailMessage: '',
            passwordMessage: '',
        };
    }

    onEmailChange = event => {
        const email = event.target.value;
        this.setState({email: email});
    }

    onPasswordChange = event => {
        const password = event.target.value;
        this.setState({password: password});
    }

    onEmailBlur = event => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.email === '') {
            this.setState({emailMessage: 'Email cannot be blank',validateEmail:true, validEmail: false});
            return;
        }
        if(!re.test(this.state.email)){
            this.setState({emailMessage: 'Please enter valid Email',validateEmail:true,validEmail: false});
            return;
        }
        else {
            this.setState({validateEmail:true,validEmail: true});
            return;
        }
    }

    onPasswordBlur = event => {
        
        if(this.state.password === '') {
            this.setState({validatePass:true, validPassword: false, passwordMessage: 'Password cannot be left blank'});
            return;
        }
        else {
            this.setState({validatePass:true,validPassword: true});
            return;
        }
    }

    validateUser = () => {
        const user = this.props.user[0];
        
        if(user.email === this.state.email) {
            if(user.password === this.state.password) {
                
                this.props.verifyUser();
            }
            else{
                this.setState({validPassword: false, passwordMessage: 'Password not correct, Enter valid password'});
            }

        }
        else{
            this.setState({validEmail: false, emailMessage: 'Email not correct, Enter valid Mail Id'});
        }
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
                                valid={this.state.validateEmail && this.state.validEmail}
                                invalid={this.state.validateEmail && !this.state.validEmail}
                                onChange={this.onEmailChange}
                                onBlur={this.onEmailBlur}
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
                                valid={this.state.validatePass && this.state.validPassword}
                                invalid={this.state.validatePass && !this.state.validPassword}
                                onChange={this.onPasswordChange}
                                onBlur={this.onPasswordBlur}
                            />
                            <FormFeedback>{this.state.passwordMessage}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Button disabled={!this.state.validEmail || !this.state.validPassword} onClick={this.validateUser}>Submit</Button>
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

export default connect(state => {
    const user = state.userReducer || {};
    return {
        user
    }
}, dispatch => {
    return bindActionCreators({ verifyUser: verifyUser }, dispatch)
})(LogIn);