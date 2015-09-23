import ViolationFormController from './violation-form-controller';
import { API } from '../../core/routes';
import { ABSTRACT_TEMPLATE } from '../../core/constants';

var angular = require('angular');

function violationFactory($resource, ContextResolver) {
    'ngInject';
    var url = ContextResolver.baseUrl + API.admin.violations + '/:id',
        paramDefaults = {id: '@id'},
        actions = {
            update: {
                method: 'PUT',
                withCredentials: true
            }
        };
    
    return $resource(url, paramDefaults, actions);
}

class ViolationsController {
    constructor($state, violations) {
        'ngInject';
        angular.extend(this, {$state, violations});
    }
    
    edit(item) {
        this.$state.go('admin.violations.edit', {id: item.id});
    }
    
    remove(item) {
        item.$delete({id: item.id}, this.onSuccess, this.onError);
        this.violations.split(this.violations.indexOf(item), 1);
    }
    
    onSuccess(){}
    
    onError(response){
        console.log('removeError() called');
        console.log(response);
    }
}

function violationConfig($stateProvider){
    'ngInject';
    $stateProvider
        .state('admin.violations', {
            abstract: true,
            url: '/violations',
            views: {
                'menu-content': {
                    template: ABSTRACT_TEMPLATE
                }
            }
        })
        .state('admin.violations.index', {
            cache: false,
            url: '',
            template: require('./violations.tpl.html'),
            controller: 'ViolationsController as ctrl',
            resolve: {
                violations: (Violation) => {
                    return Violation.query();
                }
            }
        })
        .state('admin.violations.new', {
            url: '/new',
            template: require('./violation-form.tpl.html'),
            controller: 'ViolationFormController as ctrl',
            resolve: {
                model: (Violation) => {
                    return new Violation();
                }
            }
        })
        .state('admin.violations.edit', {
            url: '/:id',
            template: require('./violation-form.tpl.html'),
            controller: 'ViolationFormController as ctrl',
            resolve: {
                model: ($stateParams, Violation) => {
                    return Violation.get({id: $stateParams.id});
                }
            }
        });
}

export default angular
    .module('laxstats.admin.violations', [])
    .controller('ViolationsController', ViolationsController)
    .controller('ViolationFormController', ViolationFormController)
    .factory('Violation', violationFactory)
    .config(violationConfig);