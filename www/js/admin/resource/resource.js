var angular = require('angular');

class Resource {
    constructor($resource, ContextResolver) {
        'ngInject';
        angular.extend(this, {$resource, ContextResolver});
    }
    
    init(api, paramDefaults, actions) {
        this.url = this.ContextResolver.baseUrl + api + '/:id';
        
        paramDefaults = paramDefaults || {
            id: '@id'
        };
        actions = actions || {
            'update': {
                method: 'PUT', 
                withCredentials: true
            }
        };
        
        this.resourceClass = this.$resource(this.url, paramDefaults, actions);
    }
    
    query(params, success, error) {
        return this.resourceClass.query(params, success, error).$promise;
    }
    
    get(params, success, error) {
        return this.resourceClass.get(params, success, error).$promise;
    }
    
    create(data, params, success, error) {
        return this.resourceClass.save(params, data, success, error);
    }
    
    update(instance, params, success, error) {
        return this.resourceClass.update(params, instance, success, error);
    }
    
    delete(instance, params, success, error) {
        return instance.$delete(params, success, error);
    }
    
    clone(instance) {
        return angular.copy(instance);
    }
    
    isDirty(instance, clone) {
        return !angular.equals(instance, clone);
    }
}

export default Resource;