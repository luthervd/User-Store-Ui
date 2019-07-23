import React, {Component} from 'react';
import ServiceFactory  from '../services/serviceProvider.js';

class EditUser extends Component{
    constructor(props){
        super(props);
        this.userService = ServiceFactory.getInstance("userService");
        this.state = {
            currentClaim : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveClaim = this.saveClaim.bind(this);
    }
    handleChange(event){
        this.setState({currentClaim : event.target.value});
    }
    handleSubmit(){
        this.saveClaim(this.state.currentClaim);
    }
    saveClaim(claim){
        if(this.props.user.claims.indexOf(claim) === -1){
            this.props.user.claims.push({name: claim});
        }
        this.userService.updateUser(this.props.user)
        .then((x) => {
                this.setState({currentClaim: ""});
            }
        ); 
    }
    render(){
        return(
            <div className="user-form">
                <header>
                    <h3>Edit user {this.props.user.userName}</h3>
                </header>
                <section>
                    <ul>
                        {this.props.user.claims.map(x => <li key={x.name}>{x.name}</li>)}                    
                    </ul>
                    <form className="form" onSubmit={(e) => {e.preventDefault(); this.handleSubmit()}}>
                    <div className="formGroup">
                        <label>Claim name : </label>
                        <input type="text" value={this.state.currentClaim} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-default">Add</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default EditUser;