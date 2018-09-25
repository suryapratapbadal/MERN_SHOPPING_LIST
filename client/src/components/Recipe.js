import React, { Component } from 'react';
import {
    Collapse,
    Button,
    ListGroup,
    ListGroupItem,
    Progress,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/index';


class Recipe extends Component {
    constructor(props) {
        super(props);
        // console.log('....RECIPES PROPS..', this.props)
        this.state = {
            recipes: this.props.recipes,
            status: 'Closed',
            loader: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.recipes !== prevProps.recipes)
            this.setState({ recipes: this.props.recipes, loader: false })
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log('.......Collapse....', nextProps, this.props)
    //     this.setState({ recipes: nextProps.recipes })
    // }

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
        return (
            <div>
                {
                    this.state.loader ?
                        <Progress style={{ marginTop: '2rem', marginBottom: '1rem' }} animated color="info" value={100} /> :
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

                                <ListGroup>
                                    <TransitionGroup className="recipe-list">
                                        {recipes.map(({ _id, name }) =>
                                            (
                                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                                    <ListGroupItem color="info" key={_id}>
                                                        {name}
                                                        <Button style={{ float: 'right' }} className="remove-btn"
                                                            color='danger'
                                                            size="sm"
                                                            onClick={this.onDeleteClick.bind(this, _id)}
                                                        >
                                                            &times;
                                                        </Button>
                                                    </ListGroupItem>
                                                </CSSTransition>
                                            )
                                        )}
                                    </TransitionGroup>
                                </ListGroup>}

                        </Collapse>
                }
            </div>
        );
    }
}

export default connect(state => {
    const recipes = state.recipeReducer.recipes || [];
    return {
        recipes
    }
}, dispatch => {
    return bindActionCreators({ getRecipes: getRecipes, deleteRecipe: deleteRecipe }, dispatch)
}
)(Recipe);