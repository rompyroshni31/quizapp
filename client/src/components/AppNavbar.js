import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../App';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
    
  
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {

        this.setState({
            isOpen: !this.state.isOpen
        });

    }
    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
            
                <NavItem>
                    <span className = "navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}`: ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                <span className = "navbar-text mr-3">
                        {/* <button onClick="quiz()"><a>Quiz Section</a></button> */}
                       <a href="https://rompyroshni31.github.io/goeducation/">Quiz Section</a>
          
                        
                </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (

            <div>
                <Navbar color="dark blue" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Assignments App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                
                                { isAuthenticated ? authLinks : guestLinks }
                                
                            </Nav>
                            
                        </Collapse>
                    </Container>
                </Navbar>
            </div>

        );

    }
}
function myfun(){
    window.location.href="https://rompyroshni31.github.io/goeducation/";
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,null)(AppNavbar);
