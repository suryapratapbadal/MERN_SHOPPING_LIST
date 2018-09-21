import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Form,
    FormGroup,
    CustomInput,
    Label,
    Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/index';
import Recipe from './Recipe';

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            varient: this.props.varient || false,
        };
    }

    componentDidMount() {
        this.props.getItems();
    }
    componentDidUpdate(prevProps) {
        console.log('.......ITEMS LIST....', prevProps, this.props)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ items: nextProps.items })
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    onUpdate = (id, data) => {
        console.log('...CLICKED...', )
        this.props.updateItem(id, data)
    }

    render() {
        const { items } = this.state;

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name, completed }) =>
                            (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button className="remove-btn"
                                            color='danger'
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                            &times;
                                            </Button>
                                        {name}

                                        <Form inline style={{ float: 'right' }}>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <Label for="recipe" className="mr-sm-2">Recipe</Label>
                                                <Input type="text" name="recipe" id="recipe" placeholder="Recipe name.." />

                                            </FormGroup>
                                            <Button outline color='primary' style={{marginRight: '2rem'}}>Add</Button>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <CustomInput type="checkbox" id={_id} checked={completed} onChange={() => console.log('UPDATED')} onClick={this.onUpdate.bind(this, _id, { "completed": !completed })} />
                                            </FormGroup>
                                        </Form>
                                        {/* <Checkbox completed={completed} id={_id}/> */}
                                    </ListGroupItem>
                                </CSSTransition>
                            )
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container >
        );
    }
}


export default connect(state => {
    const items = state.itemReducer.items || [];
    const updateSuccessfull = state.itemReducer.updateSuccessfull || false;
    return {
        items,
        updateSuccessfull
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem, updateItem }, dispatch)
}
)(ShoppingList);