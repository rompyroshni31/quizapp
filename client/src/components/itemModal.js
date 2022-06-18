import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import  { connect } from 'react-redux';
import { addItem } from '../actions/itemAction';
import PropTypes from 'prop-types';

class ItemModal extends Component {

    //Initialize state
    state = {
        modal: false,
        name:'',
        subject:'',
        task:''
    }

    static propTypes = {
        isAuthenticated:PropTypes.bool,
        auth: PropTypes.object.isRequired
    }
    //Toggle to hide or display modal during form submit
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //On change fn
    onChange=(e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    //Function for adding data on form submit
    onSubmit = e => {
        e.preventDefault();
        
        const newTask = {
            name: this.state.name,
            subject: this.state.subject,
            task: this.state.task
        }

        // Add item via addItem action
        this.props.addItem(newTask);

        // Close modal
        this.toggle();
    }

    render() {

        const { user } = this.props.auth;

        return(
            <div>
                { ( this.props.isAuthenticated && user.userType === "Teacher" )? <Button
                color="light"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Assignment</Button> : <h4 className="mb-3 ml-4">Student Assignments</h4>}
                

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add new assignments</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                onChange={this.onChange}
                                />
                                <Label for="subject">Subject</Label>
                                <Input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="Enter assignment subject"
                                onChange={this.onChange}
                                />
                                <Label for="task">Assignment</Label>
                                <Input
                                type="text"
                                name="task"
                                id="task"
                                placeholder="Write assignment"
                                onChange={this.onChange}
                                />
                                <Button  type="submit" color="dark" style={{ marginTop: '2rem'}} block>Add Assignment</Button>
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
    name: state.name,
    subject: state.subject,
    task: state.task,
    auth: state.auth,
    isAuthenticated :  state.auth.isAuthenticated
});

//Connects react and redux of add item
export default connect(mapStateToProps,{ addItem })(ItemModal);