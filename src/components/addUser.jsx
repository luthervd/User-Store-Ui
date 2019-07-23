import React, {Component} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { withRouter} from 'react-router-dom';

class AddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            accountNumber: 1234567
        }
        this.setUser = this.setUser.bind(this);
        this.close = this.close.bind(this);
    }

    setUser(){
        
            let user = this.state;
            Axios.post("http://localhost:3002",user)
            .then((response) => alert("saved user with status code "+ response.statusCode));
        
    }

    setUserName(userName){
        this.setState({userName:userName});
    }

    setPassword(password){
        this.setState({password: password});
    }

    close(){
        this.props.history.push("/users");
    }

    render(){
        return(
            <div className="user-form">
                <header>
                    <h3>Add a user</h3>
                </header>
                <section>
                    <form>
                        <div className="inputGroup">
                            <label>User Name</label>
                            <input className="form-control" type="text" value={this.state.userName} onChange={(e) => this.setUserName(e.target.value)}/>
                        </div>
                        <div className="inputGroup">
                            <label>Password</label>
                            <input className="form-control" type="text" value={this.state.password} onChange={(e) => this.setPassword(e.target.value)}/>
                        </div>
                        <div className="inputGroup d-flex mt-3">
                            <FontAwesomeIcon className="ml-auto mr-2 selectable" size="3x" icon="times-circle" onClick={this.close}/>
                            <FontAwesomeIcon icon="save" className="mr-2 selectable" size="3x" onClick={this.setUser}/>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

export default withRouter(AddUser);