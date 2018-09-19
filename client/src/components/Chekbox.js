import React, { Component } from 'react';
import {
    CustomInput,
    Form
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItem } from '../actions/index';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        console.log('...PASSED...',this.props.id)
        this.state = {
            checked: this.props.completed
        };
    }

    onUpdate = () => {
        console.log('...CLICKED...',this.props.id)
        this.props.updateItem( this.props.id,{"completed": !this.props.completed})
    }

    render() {
        return (
            <Form style={{float: 'right'}} inline>
                <CustomInput type="checkbox" id={this.props.id} checked={this.state.checked} onChange={this.onUpdate} onClick={(event)=> this.setState({checked: !this.state.checked})}/>
            </Form>
        )
    }
}

export default connect(state=> {
    return ''
}, dispatch => {
    return bindActionCreators({ updateItem: updateItem }, dispatch)
}
)(Checkbox);