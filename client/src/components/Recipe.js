import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    ListGroupItem,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';


import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/index';


class Recipe extends Component {
    constructor(props) {
        super(props);
        console.log('....RECIPES PROPS..', this.props)
        this.state = {
            recipes: this.props.recipes,
            status: 'Closed',
            loader: false,
        };
    }
    componentDidMount () {
        console.log('in did mount');
        this.props.getRecipes(this.props.id)
    }


    componentDidUpdate(prevProps) {
        if (this.props.recipes !== prevProps.recipes) {
            console.log('in update');
            this.setState({ recipes: this.props.recipes, loader: false })
        }
            
    }

    onEntering = () => {
        this.setState({ loader: true })
        this.props.getRecipes(this.props.id)
    }

    // onEntered = () => {
    //     console.log('......Opened....');
    // }

    // onExiting = () => {
    //     console.log('......Closing....');
    // this.setState({recipes: []})
    // }

    // onExited = () => {

    // }

    //   toggle = () => {
    //     this.setState({ collapse: !this.state.collapse });
    //   }

    onDeleteClick = id => {
        this.props.deleteRecipe(id);
    }

    render() {
        const { recipes } = this.state;
        console.log(recipes)
        const { classes } = this.props;
        return (
            <React.Fragment  className={classes.root}>
                <Collapse in={this.props.id === this.props.open_id && this.props.collapse} timeout="auto" unmountOnExit>
                    {recipes.length <= 0 ?
                        <Card>
                                    <CardBody>
                                        <CardTitle>No Recipe listed!!</CardTitle>
                                    </CardBody>
                        </Card> :
                        <div>
                            {recipes.map(({ _id, name }) =>
                                (
                                    <List component="div" disablePadding key={_id}>
                                        <ListItem button className={classes.nested}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText inset primary="Starred" />
                                        </ListItem>
                                    </List>
                                )
                            )}
                        </div>
                    }
                </Collapse>
            </React.Fragment>


        );
    }
}


const styles = theme => ({
    root: {
        marginLeft: '2rem'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

export default connect(state => {
    const recipes = state.recipeReducer.recipes || [];
    return {
        recipes
    }
}, dispatch => {
    return bindActionCreators({ getRecipes: getRecipes, deleteRecipe: deleteRecipe }, dispatch)
}
)(withStyles(styles)(Recipe));