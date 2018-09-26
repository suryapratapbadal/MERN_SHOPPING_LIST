import React, { Component } from 'react';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon  from '@material-ui/icons/AddShoppingCart';


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <AddShoppingCartIcon/>
                        </IconButton>
                        
                        <Typography variant="title" color="inherit" className={classes.grow} href="/">
                            ShoopinList
                        </Typography>
                        <Button variant="contained" color='secondary' style={{marginLeft: '2em'}} disabled={!this.props.user}>Log Out</Button>
                    </Toolbar>
                </AppBar>
            </div>
            
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

export default withStyles(styles)(AppNavbar);