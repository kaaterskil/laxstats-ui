import { contextResolverFactory } from './context-resolver';
import { authFactory } from './auth-factory';
import { textareaDirective } from './directives';
import SessionService from './session-service';
import DateDescriptor from './date-descriptor';
import HttpInterceptorProvider from './http-interceptor';
import CsrfInterceptorProvider from './csrf-interceptor';
import DateInterceptorProvider from './date-interceptor';

require('angular-cookies');
require('./error/index');

function coreConfig($provide, $httpProvider) {
    'ngInject';

    // Set request interceptors
    $httpProvider.interceptors.push('CsrfInterceptor');
    $httpProvider.interceptors.push('HttpInterceptor');
    
    // Set response interceptors
    $httpProvider.interceptors.push('DateInterceptor');
}

export default require('angular')
    .module('laxstats.core', [
        'ngCookies',
        'laxstats.core.error'
    ])
    .provider('CsrfInterceptor', CsrfInterceptorProvider)
    .provider('HttpInterceptor', HttpInterceptorProvider)
    .provider('DateInterceptor', DateInterceptorProvider)
    .service('SessionService', SessionService)
    .service('DateDescriptor', DateDescriptor)
    .factory('ContextResolver', contextResolverFactory)
    .factory('AuthService', authFactory)
    .directive('textarea', textareaDirective)
    .config(coreConfig);