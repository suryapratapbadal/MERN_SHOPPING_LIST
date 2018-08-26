import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from '../actions/index';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }

    componentDidMount() {
        this.props.getItems();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: nextProps.items })
    }

    render() {
        const { items } = this.state;
        return (
            <Container>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() => {
                        const name = prompt('Enter Item Name');
                        if (name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }));
                        }
                    }}>Add Item</Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) =>
                            (
                                <CSSTransition key={id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={() => {
                                                this.setState(state => ({
                                                    items: state.items.filter(item => item.id !== id)
                                                }));
                                            }}>
                                            &times;
                                            </Button>
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            )
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


export default connect(state => {
    const items = state.itemReducer.items || [];
    return {
        items
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems }, dispatch)
}
)(ShoppingList);