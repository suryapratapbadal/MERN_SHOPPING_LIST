import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import ItemFilter from './ItemFilter';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addItem } from '../actions/index';

export class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            varient: this.props.varient || false,
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    onChange = event => {
        this.setState({ name: event.target.value });
    }

    onSubmit = event => {

        event.preventDefault();
        const newItem = {
            name: this.state.name,
            varient: this.props.varient || false,
        };


        this.props.addItem(newItem);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Item</Button>
                {this.state.varient && <ItemFilter/>}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shooping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(state => {
    return {}
}, dispatch => {
    return bindActionCreators({ addItem: addItem }, dispatch)
}
)(ItemModal);