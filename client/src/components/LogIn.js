import React, { Component } from 'react';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { verifyUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validEmail: false,
            validateEmail: false,
            email: '',
            password: '',
            emailMessage: '',
            passwordMessage: '',
        };
    }

    onEmailChange = event => {
        
        const email = event.target.value;
        this.setState({ email: email });
    }

    onPasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password });
    }

    onEmailBlur = event => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.state.email === '') {
            this.setState({ emailMessage: 'Email cannot be blank', validateEmail: true, validEmail: false });
            return;
        }
        if (!re.test(this.state.email)) {
            this.setState({ emailMessage: 'Please enter valid Email', validateEmail: true, validEmail: false });
            return;
        }
        else {
            this.setState({ validateEmail: true, validEmail: true });
            return;
        }
    }

    validateUser = () => {
        const user = this.props.user[0];

        if (user.email === this.state.email) {
            if (user.password === this.state.password) {

                this.props.verifyUser();
            }
            else {
                this.setState({ validPassword: false, passwordMessage: 'Password not correct, Enter valid password' });
            }

        }
        else {
            this.setState({ validEmail: false, emailMessage: 'Email not correct, Enter valid Mail Id' });
        }
    }


    render() {

        const { classes } = this.props;


        return (

            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input error={this.state.validateEmail && !this.state.validEmail} id="email" name="email" autoComplete="email" autoFocus onChange={this.onEmailChange} onBlur={this.onEmailBlur}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onPasswordChange}
                                    onBlur={this.onPasswordBlur}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                disabled={!this.state.validEmail || this.state.password === ''}
                                onClick={this.validateUser}
                            >
                            Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>

           
        );
    }
}

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export default connect(state => {
    const user = state.userReducer || {};
    return {
        user
    }
}, dispatch => {
    return bindActionCreators({ verifyUser: verifyUser }, dispatch)
})(withStyles(styles)(LogIn));