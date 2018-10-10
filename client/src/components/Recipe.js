import React, { Component } from 'react';
import {
    Collapse,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/index';


class Recipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: this.props.recipes,
            status: 'Closed',
            loader: false,
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.recipes !== prevProps.recipes) {
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

    onDeleteClick = (id, event) => {
        event.stopPropagation();
        this.props.deleteRecipe(id);
    }

    render() {
        const { recipes } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {
                    this.state.loader ?
                        <LinearProgress /> :
                        <Collapse
                            isOpen={this.props.id === this.props.open_id && this.props.collapse}
                            onEntering={this.onEntering}
                            onEntered={this.onEntered}
                            onExiting={this.onExiting}
                            onExited={this.onExited}
                            style={{ marginTop: '1rem' }}
                        >

                            {recipes.length <= 0 ?
                                <Card>
                                    <TransitionGroup className="recipe-list">
                                        <CSSTransition timeout={500} classNames="fade">
                                            <CardBody>
                                                <CardTitle>No Recipe listed!!</CardTitle>
                                            </CardBody>
                                        </CSSTransition>
                                    </TransitionGroup>
                                </Card> :

                                <div className={classes.root}>

                                    {recipes.map(({ _id, name }) =>
                                        (
                                            <List component="div" disablePadding key={_id}>
                                                <ListItem button className={classes.nested}>
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
                                                </ListItem>
                                            </List>
                                        )
                                    )}
                                </div>}

                        </Collapse>
                }
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        marginLeft: '2rem',
        backgroundColor: '#838383'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});


export default connect(state => {
    const recipes = state.itemReducer.recipes || [];
    return {
        recipes
    }
}, dispatch => {
    return bindActionCreators({ getRecipes: getRecipes, deleteRecipe: deleteRecipe }, dispatch)
}
)(withStyles(styles)(Recipe));