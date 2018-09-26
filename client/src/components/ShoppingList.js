import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    CustomInput,
    Row,
    Col,
    Progress
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Recipe from './Recipe';
import AddRecipe from './AddRecipe';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/index';

// const styles = theme => ({
//     button: {
//       margin: theme.spacing.unit,
//     }
//   });

export class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            varient: this.props.varient || false,
            collapse: false,
            id: null,
            loader: true
        };
    }

    componentDidMount() {
        this.props.getItems();
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items)
            this.setState({ items: this.props.items, loader: false })
    }

    // componentWillReceiveProps(nextProps) {

    //     this.setState({ items: nextProps.items })
    // }

    onDeleteClick = id => {
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

    render() {
        const { items } = this.state;
        // const { classes } = this.props;

        return (
            <Container>
                {
                    this.state.loader ?
                        <Progress animated color="info" value={100} /> :
                        <ListGroup>
                            <TransitionGroup className="shopping-list">
                                {items.map(({ _id, name, completed }) =>
                                    (
                                        <CSSTransition key={_id} timeout={500} classNames="fade">
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>
                                                        <IconButton
                                                            color="secondary"
                                                            aria-label="Delete"
                                                            onClick={this.onDeleteClick.bind(this, _id)}
                                                            style={{marginRight: '1rem'}}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        {/* <Button 
                                                            color="secondary"
                                                            // className={classes.button}
                                                            onClick={this.onDeleteClick.bind(this, _id)}
                                                            style={{marginRight: '1rem'}}>
                                                            <Icon>delete</Icon>
                                                        </Button> */}
                                                        {name}
                                                    </Col>
                                                    <Col>
                                                        <AddRecipe item_id={_id} />
                                                    </Col>
                                                    <Col>
                                                        <Form inline style={{ float: 'right' }}>
                                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                                <Button color="primary" variant="contained" onClick={this.toggle.bind(this, _id)} style={{ marginRight: '1rem' }}>Click to open Recipe..!</Button>
                                                                <CustomInput type="checkbox" id={_id} checked={completed} onChange={() => console.log('UPDATED')} onClick={this.onUpdate.bind(this, _id, { "completed": !completed })} />
                                                            </FormGroup>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Recipe open_id={this.state.id} id={_id} collapse={this.state.collapse} />
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        </CSSTransition>
                                    )
                                )}
                            </TransitionGroup>
                        </ListGroup>
                }
            </Container >
        );
    }
}


export default connect(state => {
    const items = state.itemReducer.items || [];
    return {
        items
    }
}, dispatch => {
    return bindActionCreators({ getItems: getItems, deleteItem: deleteItem, updateItem }, dispatch)
}
)(ShoppingList);