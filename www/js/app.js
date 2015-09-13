import {APP_NAME} from './core/constants';
import {contextResolverFactory} from './core/context-resolver';

require('./main/main');
var angular = require('angular');

function appConfig($stateProvider, $urlRouterProvider){
	'ngInject';
	
    $urlRouterProvider.when('', '/main/home');
}

function appRun($ionicPlatform) {
    'ngInject';
    
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory 
    	// bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            window.StatusBar.styleDefault();
        }
    });
}

export default angular.module(APP_NAME, ['ionic', 'ui.router', 'laxstats.main'])
	.factory('ContextResolver', contextResolverFactory)
	.config(appConfig)
    .run(appRun);
