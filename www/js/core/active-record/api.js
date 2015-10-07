var inflection = require('inflection');

function apiFactory(ContextResolver) {
    
    class API {
        constructor(clazz, pk) {
            let singular = inflection.transform(clazz.name, ['underscore', 'dasherize']).toLowerCase();
            
            this._plural = inflection.pluralize(singular);
            this._baseUrl = '';
            this._primaryKey = pk || 'id';
            
            this.indexUrl = '';
            this.createUrl = '';
            this.showUrl = '';
            this.updateUrl = '';
            this.deleteUrl = '';
        }
        
        setUrl(url) {
            if(url && url.length > 0 && url.splice(-1) !== '/') {
                url = url + '/';
            } else if (!url) {
                url = '';
            }
            
            this._baseUrl = ContextResolver.baseUrl + url + this._plural;
            this._setUrls();
            
            return this;
        }
        
        _setUrls() {
            this.indexUrl = this.createUrl = this._baseUrl;
            this.showUrl = this.updateUrl = this.deleteUrl = this._baseUrl + '/:'+ this._primaryKey;
        }
        
        setPrimaryKey(pk) {
            this._primaryKey = pk;
            this._setUrls();
            
            return this;
        }
    }
    
    return API;
}

class ApiProvider {
    $get(ContextResolver) {
        'ngInject';
        return apiFactory(ContextResolver);
    }
}

export default ApiProvider;