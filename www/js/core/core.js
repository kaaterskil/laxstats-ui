import { contextResolverFactory } from './context-resolver';
import { authFactory } from './auth-factory';
import { textareaDirective } from './directives';
import SessionService from './session-service';
import HttpInterceptorProvider from './http-interceptor';
import CsrfProvider from './csrf-provider';

require('angular-cookies');
require('./error/index');

function coreConfig($provide, $httpProvider) {
    'ngInject';
    
    $provide.factory('csrfInterceptor', CsrfProvider.factory);
    $httpProvider.interceptors.push('csrfInterceptor');
    
    $provide.factory('httpInterceptor', HttpInterceptorProvider.factory);
    $httpProvider.interceptors.push('httpInterceptor');
}

export default require('angular')
    .module('laxstats.core', [
        'ngCookies',
        'laxstats.core.error'
    ])
    .service('SessionService', SessionService)
    .factory('ContextResolver', contextResolverFactory)
    .factory('AuthService', authFactory)
    .directive('textarea', textareaDirective)
    .config(coreConfig);