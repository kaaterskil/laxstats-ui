var angular = require('angular');

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
                'menuContent': {
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
    .module('laxstats.admin', [])
    .config(adminConfig)
    .controller('AdminController', AdminController)
    .controller('AdminHomeController', AdminHomeController);
