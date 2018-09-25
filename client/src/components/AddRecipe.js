import React, { Component } from 'react';
import {
    Form,
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addRecipe} from '../actions/index'

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeInput: '',
            item_id: this.props.item_id,
            loader: false
        };
    }

    onChange = event => {
        this.setState({ recipeInput : event.target.value})
    }

    onSubmit = event => {
        event.preventDefault();
        // this.setState({loader: true});
        const newRecipe = {
            item_id: this.state.item_id,
            name: this.state.recipeInput,
        };
        this.props.addRecipe(newRecipe);
    }

    render() {
        return (
            <Form inline onSubmit={this.onSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="recipe" className="mr-sm-2">Recipe</Label>
                    <Input type="text" name="recipe" id="recipe" placeholder="Recipe name.." onChange={this.onChange}/>
                    <Button outline color='primary' style={{ marginLeft: '1rem' }} disabled={this.state.recipeInput === ''}>Add</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default connect (state => {
    const loader = state.itemReducer.loader || false;
    return {
        loader
    }
}, dispatch => {
    return bindActionCreators({addRecipe: addRecipe},dispatch)
})(AddRecipe)