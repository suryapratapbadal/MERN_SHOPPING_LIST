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
        this.state = {
            checked: this.props.completed,
            // updateSuccessfull: this.props.updateSuccessfull
        };
    }
    componentDidUpdate(prevProps) {
        console.log('....UPDATE...',this.props.updateSuccessfull,prevProps.updateSuccessfull);
        if(this.props.updateSuccessfull=== true) {
            this.setState({checked: !this.state.checked})
        }
    }

    onUpdate = () => {
        console.log('...CLICKED...',this.props.id)
        this.props.updateItem( this.props.id,{"completed": !this.props.completed})
    }

    render() {
        return (
            <Form style={{float: 'right'}} inline>
                <CustomInput type="checkbox" id={this.props.id} checked={this.state.checked} onChange={()=>console.log('changed')} onClick={this.onUpdate}/>
            </Form>
        )
    }
}

export default connect(state=> {
    const updateSuccessfull = state.itemReducer.updateSuccessfull || false;
    return {
        updateSuccessfull
    }
}, dispatch => {
    return bindActionCreators({ updateItem: updateItem }, dispatch)
}
)(Checkbox);