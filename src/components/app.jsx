import React, {Component} from 'react';
import UserList from './userList.jsx';
import AddUser from './addUser.jsx';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faUserEdit, faUserPlus, faUserMinus, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ServiceFactory  from '../services/serviceProvider.js';
import { withRouter, Route } from "react-router-dom";

library.add(faCheckSquare, faCoffee, faUserEdit, faUserPlus, faUserMinus, faSave, faTimesCircle);

class App extends Component{
    constructor(props){
        super(props);
        this.userService = ServiceFactory.getInstance("userService");
        this.state = {
            message : "User Store",
            currentUsers: [],
            loading: false,
            addingUser: false
        };
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount(){
       this.setState({loading: true});
       this.userService.getUser()
        .then((users) => {
            this.setState({loading: false, currentUsers: users});
            this.props.history.push("/users");
        })
        .catch((err) => {
            console.error("Error loading users from user service");
        });
        
    }
    addUser(){
        this.props.history.push('/addUser');
    }
    render(){
        return (
            <div>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1 className="navbar-brand">{this.state.message}</h1>
                    <FontAwesomeIcon className="ml-auto selectable" icon={faUserPlus} size="2x" onClick={this.addUser}/>
                </div>
                <Route path="/users" render={() => <UserList users={this.state.currentUsers} history={this.props.history} />}/>
                <Route path="/addUser" render={() => <AddUser/>}/>
            </div>
        );
    }
}

export default withRouter(App);