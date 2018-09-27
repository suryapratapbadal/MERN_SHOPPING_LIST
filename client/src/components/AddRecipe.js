import React, { Component } from 'react';

import {
    Form,
    FormGroup,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';


class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            item_id: this.props.item_id,
            loader: false
        };
    }

    onChange = name => event => {
        this.setState({ [name]: event.target.value, })
    }

    onSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        
        const newRecipe = {
            item_id: this.state.item_id,
            name: this.state.name,
        };
        this.setState({name: ''})
        this.props.addRecipe(newRecipe);
    }

    render() {

        const { classes } = this.props;

        return (
            <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <TextField
                                id="outlined-name"
                                 label="Recipe Name*"
                                 className={classes.textField}
                                 value={this.state.name}
                                 onChange={this.onChange('name')}
                                 margin="normal"
                                 variant="outlined"
                             />
                    <Button variant="fab" mini color="secondary" aria-label="Add" className={classes.button} disabled={this.state.name === ''} onClick={this.onSubmit}>
                        <AddIcon />
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

export default connect(state => {
    const loader = state.itemReducer.loader || false;
    return {
        loader
    }
}, dispatch => {
    return bindActionCreators({ addRecipe: addRecipe }, dispatch)
})(withStyles(styles)(AddRecipe));