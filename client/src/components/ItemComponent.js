import React, { Component } from 'react';
import {
    ListGroupItem,
    Button,
    Form,
    CustomInput
} from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteItem, updateItem } from '../actions';

class ItemComponent extends Component {
    constructor(props) {
        super(props);
        // console.log('...PASSED...',this.props.id)
        this.state = {
            checked: this.props.item.completed,
            id: this.props.item._id,
            name:this.props.item.name

        };
    }

    componentDidUpdate(prevProps) {
        console.log('....prevProps', prevProps, this.props.item)
        if (this.props.updateSuccessfull === false) {
            this.setState({ checked: !this.state.checked });
        }
    }

    onUpdate = () => {
        console.log('...CLICKED...', this.state.id)
        this.props.updateItem(this.state.id, { "completed": !this.props.item.completed })
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        return (
            <CSSTransition timeout={500} classNames="fade">
                <ListGroupItem>
                    <Button className="remove-btn"
                        color={this.state.checked ? 'success' : 'danger'}
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, this.state.id)}>
                        &times;
                    </Button>
                    {this.state.name}
                    <Form style={{ float: 'right' }} inline>
                        <CustomInput type="checkbox" id={this.state.id} checked={this.state.checked} onChange={this.onUpdate} onClick={(event) => this.setState({ checked: !this.state.checked })} />
                    </Form>
                </ListGroupItem>
            </CSSTransition>

        )
    }
}

export default connect(state => {
    const updateSuccessfull = state.itemReducer.updateSuccessfull || true;
    return {
        updateSuccessfull
    }
}, dispatch => {
    return bindActionCreators({ deleteItem: deleteItem, updateItem: updateItem }, dispatch)
}
)(ItemComponent);