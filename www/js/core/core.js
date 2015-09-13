import {contextResolverFactory} from './context-resolver';
import {authFactory} from './auth-factory';
import SessionService from './session-service';

require('angular-cookies');

export default require('angular')
    .module('laxstats.core', ['ngCookies'])
    .service('SessionService', SessionService)
    .factory('ContextResolver', contextResolverFactory)
    .factory('AuthService', authFactory);