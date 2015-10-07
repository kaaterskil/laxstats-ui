var angular = require('angular');

class LoginController {
    constructor($scope, AuthService) {
        'ngInject';
        angular.extend(this, {$scope, AuthService});
        
        this.error = false;
        this.message = '';
        this.credentials = {
            username: null,
            password: null
        };
    }
    
    isAuthenticated() {
       return this.AuthService.authenticated(); 
    }
    
    login() {
        this.AuthService.authenticate(this.credentials);
        if(this.AuthService.authenticated) {
            this.message = 'Login succeeded';
            this.error = false;
        } else {
            this.message = 'Login failed';
            this.error = true;
        }
    }
}

export default angular.module('laxstats.main.login', [])
    .controller('LoginController', LoginController);
