var angular = require('angular');

import Resource from './resource/resource';

function adminConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('admin', {
            url: '/admin',
            abstract: true,
            template: require('./admin.tpl.html'),
            controller: 'AdminController'
        })
        .state('admin.home', {
            url: '/home',
            views: {
                'menu-content': {
                    template: require('./home.tpl.html'),
                    controller: 'AdminHomeController as ctrl'
                }
            }
        });
}

class AdminController {
    constructor($scope, $ionicSideMenuDelegate, AuthService) {
        'ngInject';
        angular.extend(this, {$scope, AuthService});

        $scope.toggleLeft = () => {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
    
    logout() {
        this.AuthService.clear();
    }
}

class AdminHomeController {
    constructor() {
        this.title = "Welcome to the Manager's Office";
    }
}

export default angular
    .module('laxstats.admin', [
        'ngResource',
        require('./seasons').name,
        require('./sites').name,
        require('./teams').name,
        require('./violations').name
    ])
    .config(adminConfig)
    .controller('AdminController', AdminController)
    .controller('AdminHomeController', AdminHomeController)
    .service('Resource', Resource);
