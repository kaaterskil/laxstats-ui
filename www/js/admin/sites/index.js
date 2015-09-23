import SiteFormController from './site-form-controller';
import { API } from '../../core/routes';
import { ABSTRACT_TEMPLATE } from '../../core/constants';

var angular = require('angular');

function siteFactory($resource, ContextResolver) {
    'ngInject';
    var url = ContextResolver.baseUrl + API.admin.sites + '/:id',
        paramDefaults = {id: '@id'},
        actions = {
            update: {
                method: 'PUT', 
                withCredentials: true
            }
        };
    
    return $resource(url, paramDefaults, actions);
}

class SitesController {
    constructor($state, sites) {
        'ngInject';       
        angular.extend(this, {$state, sites});
    }
    
    edit(item) {
        this.$state.go('admin.sites.edit', {id: item.id});
    }
    
    remove(item) {
        item.$delete({id: item.id}, this.removeSuccess, this.removeError);
        this.sites.splice(this.sites.indexOf(item), 1);
    }
    
    removeSuccess(data, headers){
        // Noop
    }
    
    removeError(response){
        console.log('removeError');
        console.log(response);
    }
}

function siteConfig($stateProvider){
    'ngInject';   
    $stateProvider
        .state('admin.sites', {
            abstract: true,
            url: '/sites',
            views: {
                'menu-content': {
                    template: ABSTRACT_TEMPLATE,
                }
            }
        })
        .state('admin.sites.index', {
            cache: false,
            url: '',
            template: require('./sites.tpl.html'),
            controller: 'SitesController as ctrl',
            resolve: {
                sites: (Site) => { 
                    return Site.query();
                }
            }
        })
        .state('admin.sites.new', {
            url: '/new',
            template: require('./site-form.tpl.html'),
            controller: 'SiteFormController as ctrl',
            resolve: {
                model: (Site) => {
                    return new Site();
                }
            }
        })
        .state('admin.sites.edit', {
            url: '/:id',
            template: require('./site-form.tpl.html'),
            controller: 'SiteFormController as ctrl',
            resolve: {
                model: ($stateParams, Site) => {
                    return Site.get({id: $stateParams.id});
                }
            }
        });
}

export default angular
    .module('laxstats.admin.sites', [])
    .config(siteConfig)
    .controller('SitesController', SitesController)
    .controller('SiteFormController', SiteFormController)
    .factory('Site', siteFactory);
