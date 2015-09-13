function mainConfig($stateProvider) {
	'ngInject';
	
    $stateProvider
        .state('main', {
            url:'/main',
            abstract: true,
            template: require('./main.tpl.html'),
            controller: 'MainController'
        })
        .state('main.home', {
            url: '/home',
            views: {
                'menuContent': {
                    template: require('./home.tpl.html'),
                    controller: 'HomeController'
                }
            }
        })
        .state('main.fields', {
            url: '/fields',
            views: {
                'menuContent': {
                    template: require('./fields/fields.tpl.html'),
                    controller: 'FieldController'
                }
            }
        });
}

class MainController {
	constructor($scope) {
		'ngInject';
		this.$scope = $scope;
	}
}

class HomeController {
	constructor($scope) {
		'ngInject';
		this.$scope = $scope;
	}
}

require('angular')
	.module('laxstats.main', [require('./fields').name])
    .config(mainConfig)
    .controller('MainController', MainController)
    .controller('HomeController', HomeController);
