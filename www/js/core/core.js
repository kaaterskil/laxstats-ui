import { contextResolverFactory } from './context-resolver';
import { authFactory } from './auth-factory';
import { textareaDirective } from './directives';
import SessionService from './session-service';
import HttpInterceptorProvider from './http-interceptor';
import CsrfInterceptorProvider from './csrf-interceptor';
import DateInterceptorProvider from './date-interceptor';
import DateDescriptorProvider from './date-descriptor';

require('angular-cookies');
require('./error/index');

function coreConfig($provide, $httpProvider, DateDescriptorProvider) {
    'ngInject';

    // Set request interceptors
    $httpProvider.interceptors.push('CsrfInterceptor');
    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.interceptors.push('DateInterceptor');
    
    // Transform date strings into Date objects
    let descriptor = DateDescriptorProvider.$get();
    $httpProvider.defaults.transformResponse.push(data => {
        let result = descriptor.parseObject(data);
        return result;
    });
}

export default require('angular')
    .module('laxstats.core', [
        'ngCookies',
        'laxstats.core.error'
    ])
    .provider('CsrfInterceptor', CsrfInterceptorProvider)
    .provider('HttpInterceptor', HttpInterceptorProvider)
    .provider('DateInterceptor', DateInterceptorProvider)
    .provider('DateDescriptor', DateDescriptorProvider)
    .service('SessionService', SessionService)
    .factory('ContextResolver', contextResolverFactory)
    .factory('AuthService', authFactory)
    .directive('textarea', textareaDirective)
    .config(coreConfig);