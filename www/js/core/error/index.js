import ErrorService from './error-service';

var angular = require('angular');

function errorDirective(){
    return {
        restrict: 'EA',
        template: require('./error.tpl.html'),
        scope: {
           errors: '=' 
        }
    };
}

export default angular
    .module('laxstats.core.error', [])
    .service('ErrorService', ErrorService)
    .directive('laxError', errorDirective);