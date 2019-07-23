import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route } from 'react-router-dom';
import EditUser  from './editUser.jsx';
import ServiceFactory  from '../services/serviceProvider.js';

class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: {}
        }
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.userService = ServiceFactory.getInstance("userService");
    }

    editUser(user){
        this.setState({currentUser: user});
        this.props.history.push("/users/editUser");
    }

    deleteUser(user){
        this.userService.deleteUser(user.userName);
    }

    render(){
        return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>No. Claims</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map(x => 
                    <tr key={x.userName}>
                        <td>
                            {x.userName}
                        </td>
                        <td>
                            {x.claims.length}
                        </td>
                        <td>
                            <FontAwesomeIcon icon="user-edit" className="mr-2 selectable" onClick={(e) => this.editUser(x)}/>
                            <FontAwesomeIcon icon="user-minus" className="mr-2 selectable" onClick={(e) => this.deleteUser(x)}/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <Route path="/users/editUser" render={() => <EditUser user={this.state.currentUser}/>}/>
        </div>
        )
    }
}

export default UserList;