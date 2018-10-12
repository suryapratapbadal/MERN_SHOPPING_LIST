import React, { Component } from 'react';
import {
    Container,
} from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import Recipe from './Recipe';
import AddRecipe from './AddRecipe';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/index';

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
            itemName: ''
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
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


    onDeleteClick = (id, event) => {
        event.stopPropagation();
        this.props.deleteItem(id);
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


    onChange = event => {
        this.setState({ itemName: event.target.value });
    }

    editItem = (event, id) => {
        event.stopPropagation();
        this.setState({ editItem: true, editItemId: id, itemName: '' });
    }
    saveItem = (event, id) => {
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
                            {items.map(({ _id, name, completed }) =>
                                (

                                    <Grid container key={_id}>
                                        <Grid item xs={12}>
                                            <ListItem button onClick={this.toggle.bind(this,_id)} disabled={loading}>
                                                <Grid item xs={1}>
                                                    <ListItemIcon>
                                                        <IconButton
                                                            color="secondary"
                                                            aria-label="Delete"
                                                            onClick={(event) => this.onDeleteClick(_id, event)}
                                                            style={{ marginRight: '1rem' }}
                                                            disableRipple>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemIcon>
                                                </Grid>
                                                <Grid item xs={5}>
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
                                                <Grid item xs={1}>
                                                    <IconButton

                                                        style={{ marginRight: '1rem' }}
                                                        disableRipple>
                                                        {
                                                            this.state.editItem && _id === this.state.editItemId ?
                                                                <SaveIcon onClick={event => this.saveItem(event, _id)} /> :
                                                                <EditIcon onClick={event => this.editItem(event, _id)} />
                                                        }

                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <AddRecipe item_id={_id} style={{ float: 'right' }} />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    {this.state.collapse ? <ExpandLess /> : <ExpandMore />}

                                                </Grid>
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        onChange={this.onUpdate.bind(this, _id, { "completed": !completed })}
                                                        checked={completed}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Recipe open_id={this.state.id} id={_id} collapse={this.state.collapse} />
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
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
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
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem, updateItem}, dispatch)
}
)(withStyles(styles)(ShoppingList));