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
import { updateItem } from '../actions/index';


export class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            item_id: this.props.item_id,
            invalitRecipeName: false,
        };
    }

    onChange = name => event => {
        this.setState({ [name]: event.target.value, })
    }

    onSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        if (/^[a-zA-Z]+$/.test(this.state.name)){
            const newRecipe = {
                name: this.state.name,
            };
            this.setState({ name: '' });
            this.props.updateItem(this.props.id,{'$push': {'recipes': newRecipe}});
        }else{
            alert('Recipe name should contain only Alphabets');
            this.setState({name: ''});
            return;
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <Form inline onSubmit={this.onSubmit}>
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
                    <Button type='submit' variant="fab" mini color="secondary" aria-label="Add" className={classes.button} disabled={this.state.name === ''}>
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
    return bindActionCreators({ updateItem: updateItem }, dispatch)
})(withStyles(styles)(AddRecipe));