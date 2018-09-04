import React, { Component } from 'react';
import {
    CustomInput,
    Form
} from 'reactstrap';


export default class ItemFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'all',
        };
    }

    render() {
        return (
            <div style={{padding: '2em'}}>
                <Form inline>
                    <CustomInput type="radio" id="itemShopped" name="item" label="All" checked={this.state.selected === 'all'} />
                    <CustomInput type="radio" id="itemPending" name="item" label="Shopped" checked={this.state.selected === 'shopped'} />
                    <CustomInput type="radio" id="allItems" name="item" label="Pending" checked={this.state.selected === 'pending'} />
                </Form>
            </div>
        )
    }
}