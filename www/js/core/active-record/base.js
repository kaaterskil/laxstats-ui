var angular = require('angular'),
    _ = require('underscore');

function baseResourceFactory(API, ResourceCache, Serializer, deferred, httpGet, urlFormat, $http, $q) {
    let serializer = new Serializer(),
        pk = 'id',
        self;
    
    function setPrimaryKey(instance, data) {
        instance[pk] = data[pk];
    }
    
    function argify(terms) {
        let key = terms;
        terms = {};
        terms[pk] = key;
        return terms;
    }
    
    class BaseResource {
        constructor() {
            self = this;
        }
        
        /*---------- Pseudo properties ----------*/
        
        get className() {
            return this.constructor.name;
        }
        
        get primaryKey() {
            return pk;
        }
        
        set primaryKey(key) {
            pk = key;
            this.api.setPrimaryKey(pk);
        }
        
        /*---------- Class properties ----------*/
        
        get httpConfig() {
            if(!this.constructor._httpConfig) {
                this.constructor._httpConfig = {cache: true};
            }
            return this.constructor._httpConfig;
        }
        
        set httpConfig(config) {
            this.constructor._httpconfig = angular.extend(this.constructor._httpConfig, config);
        }
        
        get api() {
            if(!this.constructor._api) {
                this.constructor._api = new API(this.constructor);
            }
            return this.constructor._api;
        }
        
        get cache() {
            if(!this.constructor._cache) {
                this.constructor._cache = new ResourceCache(this.className);
            }
            return this.constructor._cache;
        }
        
        /*---------- Fetch methods ----------*/
        
        query(terms, config) {
            let url = this.api.indexUrl;
            if(!config) {
                config = {};
            }
            config.isArray = true;
            return httpGet(url, terms, config).then((json) => {
                let results = [];
                for (let i in json) {
                    if(json.hasOwnProperty(i)) {
                        let instance = this.hydrate(json[i]);
                        results.push(instance);
                        serializer.deserialize(json[i], instance);
                    }
                }
                return results;
            });
        }
        
        all() {
            return this.query({}).then((result) => {
                var df = $q.defer();
                df.resolve(result);
                return df.promise;
            });
        }
        
        get(terms){
            let url = this.api.showUrl, cached;
            if(typeof terms !== 'object') {
                terms = argify(terms);
            }

            cached = _.first(_.where(this.cache.values(), terms));
            if(cached) {
                return deferred(cached);
            } else {
                return httpGet(url, terms).then((data) => {
                    let instance = this.hydrate(data);
                    return serializer.deserialize(data, instance);
                });
            }
        }
        
        /*---------- Persistence methods ----------*/
        
        $create(data) {
            if(!data) {
                data = {};
            }
            let instance = new this.constructor(data);
            return instance.$save().then((response) => {
                instance = response;
                this.cacheInstance(instance);
                return deferred(instance);
            });
        }
        
        $save(instance, url, isPut){
            let config, method, data;
            if(!instance) {
                instance = this;
            }
            
            // If passed with no arguments, try to set them: If the instance contains a primary
            // key, PUT to this.api.updateUrl. Otherwise, POST to this.api.createUrl.
            if(instance && instance[pk] && !url) {
                url = urlFormat(this.api.updateUrl, instance);
                if(isPut !== false) {
                    isPut = true;
                }
            } else if(!url) {
                url = this.api.createUrl;
            }
            
            data = serializer.serialize(instance);
            method = isPut? 'put' : 'post';
            config = angular.extend({}, this.httpConfig, {withCredentials: true});
            
            return $http[method](url, data, config).then((response) => {
                return serializer.deserialize(response, instance).then((instance) => {
                    return deferred(instance);
                });
            });
        }
        
        $delete() {
            let instance = this, config = {withCredentials: true}, query = {}, url;
            
            query[pk] = instance[pk];
            if(this.api.deleteUrl.indexOf('/:') !== -1) {
                url = urlFormat(this.api.deleteUrl, query);
            } else {
                url = this.api.deleteUrl;
                config.params = query;
            }
            return $http.delete(url, config).then((response) => {
                this.cache.remove(instance[pk]);
                return serializer.deserialize(response, instance).then((instance) => {
                    return deferred(instance);
                });
            });
        }
        
        /*---------- Utility methods ----------*/
        
        cacheInstance(instance) {
            let key = instance[pk];
            this.cache.put(key, instance);
        }
        
        update(data) {
            for (let prop in data) {
                if(data.hasOwnProperty(prop)) {
                    this[prop] = data[prop];
                }
            }
            let instance = this;
            return deferred(instance);
        }
        
        hydrate(data){
            if(!data) {
                data = {};
            }
            let instance = new this.constructor(data);
            setPrimaryKey(instance, data);
            this.cacheInstance(instance);
            return instance;
        }
    }
    
    return BaseResource;
}

class BaseResourceProvider {
    $get(API, ResourceCache, Serializer, Deferred, httpGet, urlFormat, $http, $q) {
        'ngInject';
        return baseResourceFactory(API, ResourceCache, Serializer, Deferred, httpGet, urlFormat, $http, $q);
    }
}

export default BaseResourceProvider;