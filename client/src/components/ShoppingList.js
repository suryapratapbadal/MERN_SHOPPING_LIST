import React, { Component } from 'react';
import {
    Container,
} from 'reactstrap';


import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';

import Item from './Item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems } from '../actions/index';

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            loader: true,
        };
        
    }

    componentDidMount() {
        this.props.getItems();
    }

    componentDidUpdate(prevProps) {

        if (this.props.items !== prevProps.items)
            this.setState({ items: this.props.items, loader: false })
    }


    render() {
        const { items, loader } = this.state;
        const { classes, loading } = this.props;

        return (
            <Container className={classes.root}>
                {
                    loader ?
                        <LinearProgress /> :
                        <List
                            component="nav"
                        >
                            {loading && <LinearProgress />}
                            {items.map(({ _id, name, completed, recipes }) =>
                                ( 
                                    <Item _id={_id} name={name} completed={completed} recipes={recipes}/>
                                )
                            )}
                        </List>
                }

            </Container >
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    }
});

export default connect(state => {
    const items = state.itemReducer.items || [];
    const loading = state.itemReducer.loading || false;
    return {
        items,
        loading
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems }, dispatch)
}
)(withStyles(styles)(ShoppingList));