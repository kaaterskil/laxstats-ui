import TeamFormController from './team-form-controller';
import { API } from '../../core/routes';
import { ABSTRACT_TEMPLATE } from '../../core/constants';

var angular = require('angular');

function teamFactory($resource, ContextResolver) {
    'ngInject';
    var url = ContextResolver.baseUrl + API.admin.teams + '/:id',
        paramDefaults = {id: '@id'},
        actions = {
            update: {
                method: 'PUT',
                withCredentials: true
            }
        };
    return $resource(url, paramDefaults, actions);
}

class TeamsController {
    constructor($state, collection) {
        'ngInject';
        angular.extend(this, {$state, collection});
    }
    
    edit(item) {
        this.$state.go('admin.teams.edit', {id: item.id});
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

function teamsConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('admin.teams', {
            abstract: true,
            url: '/teams', 
            views: {
                'menu-content': {
                    template: ABSTRACT_TEMPLATE
                }
            }
        })
        .state('admin.teams.index', {
            cache: false,
            url: '',
            template: require('./teams.tpl.html'),
            controller: 'TeamsController as ctrl',
            resolve: {
                collection: (Team) => {
                    return Team.query();
                }
            }
        })
        .state('admin.teams.new', {
            url: '/new',
            template: require('./team-form.tpl.html'),
            controller: 'TeamFormController as ctrl',
            resolve: {
                model: (Team) => {
                    return new Team();
                },
                sites: (Site) => {
                    return Site.query();
                }
            }
        })
        .state('admin.teams.edit', {
            url: '/:id',
            template: require('./team-form.tpl.html'),
            controller: 'TeamFormController as ctrl',
            resolve: {
                model: ($stateParams, Team) => {
                    return Team.get({id: $stateParams.id});
                },
                sites: (Site) => {
                    return Site.query();
                }
            }
        });
}

export default angular
    .module('laxstats.admin.teams', [])
    .controller('TeamsController', TeamsController)
    .controller('TeamFormController', TeamFormController)
    .factory('Team', teamFactory)
    .config(teamsConfig);