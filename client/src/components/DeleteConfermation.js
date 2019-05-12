import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/index';

export class DeleteConfermation extends React.Component {
    state = {
        open: this.props.toggleDeleteConfirmation,
    };

    componentDidUpdate(prevProps) {

        if (prevProps.toggleDeleteConfirmation !== this.props.toggleDeleteConfirmation) {
            this.setState({ open: this.props.toggleDeleteConfirmation });
        }
    }

    // handleClickOpen = () => {
    //     this.setState({ open: true });
    // };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseAgree = () => {
        this.props.deleteItem(this.props.id);
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this Item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleCloseAgree} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(state => {
    const loading = state.itemReducer.loading || false;
    return {
        loading
    }
}, dispatch => {
    return bindActionCreators({ deleteItem: deleteItem }, dispatch)
}
)(DeleteConfermation);