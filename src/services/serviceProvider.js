import UserService from './userService';

let serviceMap = [
    {name:"userservice", value : undefined, provider : () => { return new UserService()}}
]
class ServiceProvider{
    
    constructor(){
       
    }

    getInstance(serviceName){
        let serviceInstance = serviceMap.filter(x => x.name.toLowerCase() === serviceName.toLowerCase());
        if(serviceInstance.length === 0){
            return undefined;
        }
        else{
            var service = serviceInstance[0];
            if(!service.value){
                service.value = service.provider();
            }
            return service.value;
        }
    }
}

const ServiceFactory = new ServiceProvider();

export default ServiceFactory;