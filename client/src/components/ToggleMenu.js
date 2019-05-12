import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItem } from '../actions/index';

const ITEM_HEIGHT = 25;

export class ToggleMenu extends React.Component {
  state = {
    anchorEl: null,
    shopped: this.props.completed 
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  componentDidUpdate (prevProps) {
      if(prevProps.completed !== this.props.completed)
      this.setState({shopped : this.props.completed})
  }

  handleClose = option => {
      
      if(option === 'Delete') {
          this.props.toggleDeleteConfirmationDialogue();
          this.setState({ anchorEl: null });
      } else if(option === 'Done' || option === 'Undone') {
          this.props.updateItem(this.props.id,{"completed": !this.state.shopped})
          this.setState({ anchorEl: null})
      } else {
        this.setState({ anchorEl: null})
      }
    
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const options = [
        'Delete',
        this.state.shopped ? 'Undone' : 'Done'
      ];

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 100,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} selected={option === 'Delete'} onClick={this.handleClose.bind(this,option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
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
    return bindActionCreators({ updateItem: updateItem }, dispatch)
}
)(ToggleMenu);