import Resource from '../api/resource';

class LoginResource extends Resource {
    constructor() {
        super();
    }

    login(username, password) {
        let authorization = 'Basic ' + btoa(username + ':' + password);
        let headers = {
            Authorization: authorization
        };
        console.log(headers)
        return this.fetch('/login', {headers: headers});
    }
}

export default LoginResource;
