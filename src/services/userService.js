import Axios from 'axios';
const serviceUrl = "http://localhost:3002"
class UserService {
    getUser(){
        return Axios.get(serviceUrl)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }
            else{
                return undefined;
            }
        })
        .catch((err) => {
            console.error("Error getting user form service");
        });
    }
    updateUser(user){
        return Axios.put(serviceUrl+"/"+user.userName,user)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }
            else{
                return undefined;
            }
        })
        .catch((err) => {
            console.error("Error updating user");
            return Promise.reject(err);
        });
    }
    deleteUser(userName){
        return Axios.delete(serviceUrl+"/"+userName)
        .then((res)=>{
            return res.status;
        })
        .catch((err) => {
            console.error("Error deleting user.");
        });
    }
}
export default UserService;