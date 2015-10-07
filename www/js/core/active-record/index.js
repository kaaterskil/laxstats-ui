import ApiProvider from './api';
import ResourceCacheProvider from './cache';
import SerializerProvider from './serializer';
import UrlFormatProvider from './url';
import HttpGetProvider from './get';
import BaseResourceProvider from './base';

var angular = require('angular');

class DeferredProvider {
    $get($q){
        'ngInject';
        
        return function (instance, error){
            let df = $q.defer();
            if(error) {
                df.reject(error);
            } else {
                df.resolve(instance);
            }
            return df.promise;
        };
    }
}

class ActiveRecordProvider {
    $get(BaseResource) {
        'ngInject';
        let ActiveRecord = {};
        ActiveRecord.Base = BaseResource;
        return ActiveRecord;
    }
}

export default angular
    .module('active-record', [])
    .provider('ActiveRecord', ActiveRecordProvider)
    .provider('API', ApiProvider)
    .provider('ResourceCache', ResourceCacheProvider)
    .provider('Serializer', SerializerProvider)
    .provider('Deferred', DeferredProvider)
    .provider('httpGet', HttpGetProvider)
    .provider('urlFormat', UrlFormatProvider)
    .provider('BaseResource', BaseResourceProvider);