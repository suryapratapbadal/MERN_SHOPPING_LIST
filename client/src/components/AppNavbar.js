import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button,
} from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
        };

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoopinList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://github.com/suryapratapbadal/MERN_SHOPPING_LIST">Github</NavLink>
                                </NavItem>
                            </Nav>
                            <Button color='secondary' style={{marginLeft: '2em'}} disabled={!this.props.user}>Log Out</Button>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}