import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItem } from '../actions/index';


export class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }


    onDeleteClick = (id, event) => {
        event.stopPropagation();
        this.props.updateItem(this.props.id, { '$pull': { 'recipes': { '_id': id } } });
    }

    render() {
        const { classes, recipes } = this.props;

        return (
            <div>
                {
                    this.state.loader ?
                        <LinearProgress /> :


                        <div className={classes.root}>

                            {recipes.map(({ _id, name }) =>
                                (
                                    <Chip
                                        key={_id}
                                        label={name}
                                        onDelete={(event) => this.onDeleteClick(_id, event)}
                                        className={classes.chip}
                                        color="primary"
                                    />
                                )
                            )}
                        </div>

                }
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        marginBottom: '2rem',
        marginLeft: '2rem'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});


export default connect(state => {
    const loading = state.itemReducer.loading || false;
    return {
        loading
    }
}, dispatch => {
    return bindActionCreators({ updateItem: updateItem }, dispatch)
}
)(withStyles(styles)(Recipe));