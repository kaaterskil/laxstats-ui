import SeasonFormController from './season-form-controller';
import { API } from '../../core/routes';
import { ABSTRACT_TEMPLATE } from '../../core/constants';

var angular = require('angular');

function seasonFactory($resource, ContextResolver) {
    'ngInject';
    var url = ContextResolver.baseUrl + API.admin.seasons + '/:id',
        paramDefaults = {id: '@id'},
        actions = {
            update: {
                method: 'PUT',
                withCredentials: true
            }
        };
    return $resource(url, paramDefaults, actions);
}

class SeasonsController {
    constructor($state, collection) {
        'ngInject';
        angular.extend(this, {$state, collection});
    }
    
    edit(item) {
        this.$state.go('admin.seasons.edit', {id: item.id});
    }
    
    remove(item) {
        item.$delete({id: item.id}, this.removeSuccess, this.removeError);
        this.collection.splice(this.collection.indexOf(item), 1);
    }
    
    removeSuccess(data, headers){}
    
    removeError(response){
        console.log('removeError');
        console.log(response);
    }
}

function seasonsConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('admin.seasons', {
            abstract: true,
            url: '/seasons',
            views: {
                'menu-content': {
                    template: ABSTRACT_TEMPLATE
                }
            }
        })
        .state('admin.seasons.index', {
            cache: false,
            url: '',
            template: require('./seasons.tpl.html'),
            controller: 'SeasonsController as ctrl',
            resolve: {
                collection: (Season) => {
                    return Season.query();
                }
            }
        })
        .state('admin.seasons.new', {
            url: '/new',
            template: require('./season-form.tpl.html'),
            controller: 'SeasonFormController as ctrl',
            resolve: {
                model: (Season) => {
                    return new Season();
                }
            }
        })
        .state('admin.seasons.edit', {
            url: '/:id',
            template: require('./season-form.tpl.html'),
            controller: 'SeasonFormController as ctrl',
            resolve: {
                model: ($stateParams, Season) => {
                    return Season.get({id: $stateParams.id});
                }
            }
        });
}

export default angular
    .module('laxstats.admin.seasons', [])
    .controller('SeasonsController', SeasonsController)
    .controller('SeasonFormController', SeasonFormController)
    .factory('Season', seasonFactory)
    .config(seasonsConfig);
