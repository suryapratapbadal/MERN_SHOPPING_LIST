import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

import Recipe from './Recipe';
import AddRecipe from './AddRecipe';
import DeleteConfermation from './DeleteConfermation';
import ToggleMenu from './ToggleMenu';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItem } from '../actions/index';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editItem: false,
            itemName: '',
            toggleDeleteConfirmation: false,
            selected: false
        };
    }

    toggleDeleteConfirmationDialogue = () => {
        this.setState({ toggleDeleteConfirmation: !this.state.toggleDeleteConfirmation })
    }

    onChange = event => {
        this.setState({ itemName: event.target.value });
    }

    editItem = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ editItem: true, itemName: '' });
    }
    saveItem = event => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.itemName !== '') {
            this.props.updateItem(this.props._id, { "name": this.state.itemName });
            this.setState({ editItem: false });
        }
        else
            this.setState({ editItem: false });
    }


    render() {

        const { _id, name, completed, recipes, classes, loading } = this.props;

        return (
            <Grid container key={_id} className={loading ? classes.listItemDeactivate : classes.listItem}>
                <Grid item xs={12}>
                    <ListItem>
                        <Grid item xs={1} >
                            <Checkbox
                                onChange={() => this.setState({ selected: !this.state.selected })}
                                checked={this.state.selected}
                            />
                        </Grid>
                        <Grid item xs={6} className={completed ? classes.listItemDeactivate : ''}>
                            {
                                this.state.editItem ?
                                    <TextField
                                        id="standard-uncontrolled"
                                        label="Item Name"
                                        defaultValue={name}
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={this.onChange}
                                        autoFocus
                                    /> :
                                    <ListItemText inset primary={name} />
                            }
                        </Grid>
                        <Grid item xs={1} className={completed ? classes.listItemDeactivate : ''}>
                            <IconButton
                                onClick={this.state.editItem ?  this.saveItem : this.editItem}
                                style={{ marginRight: '1rem' }}
                                disableRipple>
                                {
                                    this.state.editItem ?
                                        <SaveIcon /> :
                                        <EditIcon />
                                }

                            </IconButton>
                        </Grid>
                        <Grid item xs={4} className={completed ? classes.listItemDeactivate : ''}>
                            <AddRecipe id={_id} style={{ float: 'right' }} />
                        </Grid>

                        <ListItemSecondaryAction>
                            <DeleteConfermation toggleDeleteConfirmation={this.state.toggleDeleteConfirmation} id={_id} />
                            <ToggleMenu toggleDeleteConfirmationDialogue={this.toggleDeleteConfirmationDialogue} completed={completed} id={_id} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </Grid>
                <Grid item xs={12} className={completed ? classes.listItemDeactivate : ''}>
                    <Recipe id={_id} recipes={recipes} />
                </Grid>
            </Grid>
        );
    }
}

const styles = theme => ({
    
    listItem: {
        marginBottom: '2rem',
        backgroundColor: theme.palette.background.paper,
    },
    listItemDeactivate: {
        opacity: 0.5,
        pointerEvents: 'none'
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    }
});

export default connect(state => {
    const loading = state.itemReducer.loading || false;
    return {
        loading
    }
}, dispatch => {
    return bindActionCreators({ updateItem: updateItem }, dispatch)
}
)(withStyles(styles)(Item));