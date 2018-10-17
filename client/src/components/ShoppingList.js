import React, { Component } from 'react';
import {
    Container,
} from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import Recipe from './Recipe';
import AddRecipe from './AddRecipe';
import DeleteConfermation from './DeleteConfermation';
import ToggleMenu from './ToggleMenu';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, updateItem } from '../actions/index';

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            recipes: this.props.recipes,
            collapse: false,
            id: null,
            loader: true,
            editItem: false,
            editItemId: null,
            itemName: '',
            toggleDeleteConfirmation: false
        };
        this.editItem = this.editItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentDidMount() {
        this.props.getItems();
    }

    componentDidUpdate(prevProps) {

        if (this.props.items !== prevProps.items)
            this.setState({ items: this.props.items, loader: false })
        if (this.props.recipes !== prevProps.recipes)
            this.setState({ recipes: this.props.recipes })
    }


    onUpdate = (id, data) => {
        this.props.updateItem(id, data)
    }


    toggle = id => {
        if (this.state.id === id && this.state.collapse === true) {
            this.setState({ collapse: false });
        } else if (this.state.id === id && this.state.collapse === false) {
            this.setState({ collapse: true });
        } else {
            this.setState({ collapse: true, id: id });
        }

    }

    toggleDeleteConfirmationDialogue = () => {
        this.setState({ toggleDeleteConfirmation: !this.state.toggleDeleteConfirmation })
    }
    onChange = event => {
        this.setState({ itemName: event.target.value });
    }

    editItem = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ editItem: true, editItemId: id, itemName: '' });
    }
    saveItem = (event, id) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.itemName !== '') {
            this.onUpdate(id, { "name": this.state.itemName });
            this.setState({ editItem: false, editItemId: null });
        }
        else
            this.setState({ editItem: false, editItemId: null });
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

                                    <Grid container key={_id} className={loading ? classes.listItemDeactivate: classes.listItem}>
                                        <Grid item xs={12}>
                                            <ListItem>
                                                <Grid item xs={1} >
                                                    <Checkbox
                                                        // onChange={this.onUpdate.bind(this, _id, { "completed": !completed })}
                                                        checked
                                                    />
                                                </Grid>
                                                <Grid item xs={6} className={completed ? classes.listItemDeactivate : ''}>
                                                    {
                                                        this.state.editItem && _id === this.state.editItemId ?
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
                                                        onClick={this.state.editItem && _id === this.state.editItemId ? event => this.saveItem(event, _id) : event => this.editItem(event, _id)}
                                                        style={{ marginRight: '1rem' }}
                                                        disableRipple>
                                                        {
                                                            this.state.editItem && _id === this.state.editItemId ?
                                                                <SaveIcon/> :
                                                                <EditIcon/>
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

    },
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
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

export default connect(state => {
    const items = state.itemReducer.items || [];
    const recipes = state.itemReducer.recipes || [];
    const loading = state.itemReducer.loading || false;
    return {
        items,
        recipes,
        loading
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems, updateItem: updateItem }, dispatch)
}
)(withStyles(styles)(ShoppingList));