import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './AppNavbar';
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';
import LogIn from './LogIn';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';


class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        };
    }
    render() {
        console.log('.....',this.props.loading,this.props.user);    
        return (
            <div className="App">
                <AppNavbar user={this.props.user}/>
                {
                    !this.props.user ? <LogIn /> :
                    <Container>
                        <ItemModal />
                        <ShoppingList />
                    </Container>
                    // <Progress animated color="success" value="100" />
                }
            </div>
        );
    }
}

export default connect(state => {
    const user = state.itemReducer.user || false;
    const loading = state.itemReducer.loading;
    return {
        user,
        loading
    }
})(Root);