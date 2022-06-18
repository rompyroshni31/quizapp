import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class RegisterModal extends Component {

    //Initialize state
    state = {
        modal: false,
        userType:'',
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
        // If authenticated close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    //Toggle to hide or display modal during form submit
    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    //On change fn
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //Function for adding data on form submit
    onSubmit = e => {
        e.preventDefault();

        const { userType,name, email, password } = this.state;

        //Create new user
        const newUser = {
            userType,
            name,
            email,
            password
        };
        //Attempt to register
        this.props.register(newUser);
    }

    render() {

        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="userType">Teacher/Student</Label>
                                <Input
                                    type="text"
                                    name="userType"
                                    id="userType"
                                    className="mb-3"
                                    placeholder="Teacher or Student"
                                    onChange={this.onChange}
                                    />
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

//Mapping item to state
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

//Connects react and redux of add item
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);