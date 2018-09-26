import React, { Component } from 'react';
// import {
//     Button,
//     Modal,
//     ModalBody,
//     ModalHeader,
//     Form,
//     FormGroup,
//     Label,
//     Input
// } from 'reactstrap';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem } from '../actions/index';



const styles = theme => ({
    root: {
        marginTop: '2rem',
        marginBottom: '2rem'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    paper: {
        // position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        margin: 'auto'
    },
    button: {
        margin: theme.spacing.unit,
    },
    tittle: {
        textAlign: 'center',
        paddingBottom: '1rem',
        marginBottom: '1rem',
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    onChange = event => {
        this.setState({ name: event.target.value });
    }

    onSubmit = event => {

        event.preventDefault();
        this.toggle();
        const newItem = {
            name: this.state.name,
        };


        this.props.addItem(newItem);
        this.toggle();
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <CssBaseline/>
                <Button variant="contained" className={classes.button} onClick={this.toggle}>
                    Add Item
                    <AddIcon className={classes.rightIcon}/>
                </Button>

                {/* <Button onClick={this.toggle} >Add Item</Button> */}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal}
                    onClose={this.toggle}
                >
                    <div className={classes.paper}>
                        <Typography variant="title" id="modal-title" className={classes.tittle}>
                        Add to Shopping List
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="item">Item Name</InputLabel>
                                <Input id="item" name="item" autoComplete="Add shooping item" autoFocus onChange={this.onChange}/>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                className={classes.submit}
                                onClick={this.validateUser}
                                disabled= {this.state.name === ''}
                            >
                            Add Item
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div>
            // <div>
            //     <Button
            //         color="dark"
            //         style={{ marginBottom: '2rem' }}
            //         onClick={this.toggle}
            //     >Add Item</Button>
            //     <Modal
            //         isOpen={this.state.modal}
            //         toggle={this.toggle}
            //     >
            //         <ModalHeader
            //             toggle={this.toggle}
            //         >Add to Shopping List</ModalHeader>
            //         <ModalBody>
            //             <Form onSubmit={this.onSubmit}>
            //                 <FormGroup>
            //                     <Label for="item">Item</Label>
            //                     <Input
            //                         type="text"
            //                         name="name"
            //                         id="item"
            //                         placeholder="Add shooping item"
            //                         onChange={this.onChange}
            //                     />
            //                     <Button
            //                         color="dark"
            //                         style={{ marginTop: '2rem' }}
            //                         block
            //                     >Add Item</Button>
            //                 </FormGroup>
            //             </Form>
            //         </ModalBody>
            //     </Modal>
            // </div>
        );
    }
}

export default connect(state => {
    return {}
}, dispatch => {
    return bindActionCreators({ addItem: addItem }, dispatch)
}
)(withStyles(styles)(ItemModal));