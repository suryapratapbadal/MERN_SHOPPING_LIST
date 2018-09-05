import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Badge
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/index';

export class ShoppingList extends Component {
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

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }


    render() {
        const { items } = this.state;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) =>
                            (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                            &times;
                                            </Button>
                                        <Button color="secondary" outline>
                                            {name} <Badge color="success">4</Badge>
                                        </Button>
                                        <Button color="primary" outline style={{float:'right'}}>
                                            Add recipe <Badge color="info">&#43;</Badge>
                                        </Button>

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
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem }, dispatch)
}
)(ShoppingList);