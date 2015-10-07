import TeamSeasonFormController from './team-season-form-controller';
import { API } from '../../core/routes';
import { ABSTRACT_TEMPLATE } from '../../core/constants';

var angular = require('angular');

function teamSeasonFactory($resource, ContextResolver) {
    'ngInject';
    var url = ContextResolver.baseUrl + API.admin.teamSeasons + '/:seasonId',
        paramDefaults = {
            teamId: '@teamId',
            seasonId: '@seasonId'
        },
        actions = {
            update: {
                method: 'PUT',
                withCredentials: true
            }
        };
    return $resource(url, paramDefaults, actions);
}

class TeamSeasonsController {
    constructor($state, collection) {
        'ngInject';
        angular.extend(this, {$state, collection});
    }
    
    edit(item) {
        this.$state.go('admin.teamSeasons.edit', {teamId: item.team, id: item.id});
    }
    
    remove(item) {
        item.$delete({teamId: item.team, id: item.id}, this.removeSuccess, this.removeError);
        this.collection.splice(this.collection.indexOf(item), 1);
    }
    
    removeSuccess(data, headers){}
    
    removeError(response){
        console.log('removeError');
        console.log(response);
    }
}

function teamSeasonsConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('admin.teams.seasons', {
            abstract: true,
            url: '/seasons', 
            views: {
                'menu-content': {
                    template: ABSTRACT_TEMPLATE
                }
            }
        })
        .state('admin.teams.seasons.index', {
            cache: false,
            url: '',
            template: require('./team-seasons.tpl.html'),
            controller: 'TeamSeasonsController as ctrl',
            resolve: {
                collection: (TeamSeason) => {
                    return TeamSeason.query();
                }
            }
        })
        .state('admin.teams.seasons.new', {
            url: '/new',
            template: require('./team-season-form.tpl.html'),
            controller: 'TeamSeasonFormController as ctrl',
            resolve: {
                model: (TeamSeason) => {
                    return new TeamSeason();
                }
            }
        })
        .state('admin.teams.seasons.edit', {
            url: '/:id',
            template: require('./team-season-form.tpl.html'),
            controller: 'TeamFormSeasonController as ctrl',
            resolve: {
                model: ($stateParams, TeamSeason) => {
                    return TeamSeason.get({
                        teamId: $stateParams.teamId, 
                        id: $stateParams.id
                    });
                }
            }
        });
}

export default angular
    .module('laxstats.admin.teamSeasons', [])
    .controller('TeamSeasonsController', TeamSeasonsController)
    .controller('TeamSeasonFormController', TeamSeasonFormController)
    .factory('TeamSeason', teamSeasonFactory)
    .config(teamSeasonsConfig);