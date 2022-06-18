import React, { Component } from 'react';
import { 
    Container, 
    ListGroup, 
    ListGroupItem, 
    Button, 
    CardBody, 
    CardTitle,
    CardSubtitle,
    CardText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemAction';
import PropTypes from 'prop-types';


//Assignment list 
class AssignmentList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getItems();
    }


    //Delete button fn
    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        const { user } = this.props.auth;
        const { items } = this.props.item;
        return(
            //Assignment List
            this.props.isAuthenticated ? 
            <Container>
                <ListGroup>
                    <TransitionGroup className="assignment-list">
                        
                        {items.map(({_id, name, subject, task}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>       
                                <CardBody>
                                    <CardTitle tag="h5">{subject}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{name}</CardSubtitle>
                                    <CardText>{task}</CardText>
                                    { (this.props.isAuthenticated && user.userType === "Teacher" ) ? <Button className = "remove-btn"
                                    color="danger"
                                    onClick = {this.onDeleteClick.bind(this,_id)}
                                    >Delete
                                    </Button> : null}
                                </CardBody>
                        
                                </ListGroupItem>
                            </CSSTransition>
                        ))};
                    </TransitionGroup>
                </ListGroup>
            </Container> : null
        );
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems,deleteItem})(AssignmentList);