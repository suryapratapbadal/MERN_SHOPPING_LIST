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

import Recipe from './Recipe';
import AddRecipe from './AddRecipe';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem, getRecipes } from '../actions/index';

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            recipes: this.props.recipes,
            varient: this.props.varient || false,
            collapse: false,
            id: null,
            loader: true,
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        this.props.getItems();
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items)
            this.setState({ items: this.props.items })
        if (this.props.recipes !== prevProps.recipes)
            this.setState({ recipes: this.props.recipes })
    }

    // componentWillReceiveProps(nextProps) {

    //     this.setState({ items: nextProps.items })
    // }

    onDeleteClick = (id, event) => {
        event.stopPropagation();
        this.props.deleteItem(id);
    }

    onUpdate = (id, data) => {
        this.props.updateItem(id, data)
    }

    getItemRecipes = (id) => {
        this.props.getRecipes(id);
        this.toggle(id);
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

    render() {
        const { items } = this.state;
        const { classes } = this.props;

        return (
            <Container className={classes.root}>
                {items.map(({ _id, name, completed }) =>
                    (
                        <List
                            component="nav"
                            key={_id}
                        >
                            <ListItem button onClick={this.getItemRecipes.bind(this, _id)}>
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
                                <ListItemText inset primary={name} />
                                <IconButton
                                    onClick={!this.state.editItem ? this.editItem : this.onUpdate.bind(this, _id, { "name": this.state.name })}
                                    style={{ marginRight: '1rem' }}
                                    disableRipple>
                                    <EditIcon />
                                </IconButton>
                                <AddRecipe item_id={_id} style={{ float: 'right' }} />
                                {this.state.collapse ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Recipe open_id={this.state.id} id={_id} collapse={this.state.collapse} recipes={this.state.recipes} />
                        </List>
                    )
                )}
            </Container >
            //  <CustomInput type="checkbox" id={_id} checked={completed} onChange={() => console.log('UPDATED')} onClick={this.onUpdate.bind(this, _id, { "completed": !completed })} />
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
});

export default connect(state => {
    const items = state.itemReducer.items || [];
    const recipes = state.recipeReducer.recipes || [];
    return {
        items,
        recipes
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem, updateItem, getRecipes: getRecipes }, dispatch)
}
)(withStyles(styles)(ShoppingList));