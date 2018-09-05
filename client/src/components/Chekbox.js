import React, { Component } from 'react';
import {
    CustomInput,
    Form
} from 'reactstrap';


export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <Form style={{float: 'right'}} inline>
                <CustomInput type="checkbox" id="itemShopped" checked/>
            </Form>
        )
    }
}