import React, { Component} from 'react';
import AppNavbar from './components/AppNavbar';
import AssignmentList from './components/AssignmentList';
import ItemModal from './components/itemModal';
import {  Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authAction';

//Reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Adding Components to App
class App extends Component{

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return(
      <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
        <ItemModal />
        <AssignmentList />
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
