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
    Input,
    Row,
    Col
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Recipe from './Recipe';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/index';

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            varient: this.props.varient || false,
            collapse: false,
            id: null,
        };
    }

    componentDidMount() {
        this.props.getItems();
    }
    
    // componentDidUpdate(prevProps) {
    //     console.log('.......ITEMS LIST....', prevProps, this.props)
    // }

    componentWillReceiveProps(nextProps) {

        this.setState({ items: nextProps.items })
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    onUpdate = (id, data) => {
        console.log('...CLICKED...', id)
        this.props.updateItem(id, data)
    }

    toggle = id => {
        this.setState({ collapse: !this.state.collapse, id: id });
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
                                        <Row>
                                            <Col>
                                                <Button className="remove-btn"
                                                    color='danger'
                                                    size="sm"
                                                    onClick={this.onDeleteClick.bind(this, _id)}>
                                                    &times;
                                            </Button>
                                                {name}
                                            </Col>
                                            <Col>
                                                <Form inline >
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <Label for="recipe" className="mr-sm-2">Recipe</Label>
                                                        <Input type="text" name="recipe" id="recipe" placeholder="Recipe name.." />
                                                        <Button outline color='primary'>Add</Button>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col>
                                                <Form inline style={{ float: 'right' }}>
                                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                        <CustomInput type="checkbox" id={_id} checked={completed} onChange={() => console.log('UPDATED')} onClick={this.onUpdate.bind(this, _id, { "completed": !completed })} />
                                                        <Button color="primary" onClick={this.toggle.bind(this,_id)}>Recipe related to Item</Button>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Recipe open_id={this.state.id} id={_id}/>
                                            </Col>
                                        </Row>
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
    return {
        items
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem, updateItem }, dispatch)
}
)(ShoppingList);