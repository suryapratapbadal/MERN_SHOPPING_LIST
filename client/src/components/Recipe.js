import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // collapse: this.props.collapse,
            status: 'Closed'
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('.......Collapse....', nextProps, this.props)
        this.setState({collapse: nextProps.collapse})
    }

    onEntering = () => {
        console.log('......Opening....');
    }

    onEntered = () => {
        console.log('......Opened....');
    }

    onExiting = () => {
        console.log('......Closing....');
    }

    onExited = () => {
        console.log('......Closed....');
    }

    //   toggle = () => {
    //     this.setState({ collapse: !this.state.collapse });
    //   }

    render() {
        return (
            <div>
                {/* <Button color="primary" onClick={this.toggle}>Recipe related to Item</Button> */}
                {/* <h5>Current state: {this.state.status}</h5> */}
                <Collapse
                    isOpen={ this.props.id === this.props.open_id}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <Card>
                        <CardBody>
                            Anim pariatur cliche reprehenderit,
                           enim eiusmod high life accusamus terry richardson ad squid. Nihil
                           anim keffiyeh helvetica, craft beer labore wes anderson cred
                           nesciunt sapiente ea proident.
            </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default Example;