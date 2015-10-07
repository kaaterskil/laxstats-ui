function httpGetFactory($http, urlFormat){
    
    function resolveData(data, options){
        if(options && options.isArray) {
            return data;
        }
        if(data && data.length >= 1) {
            return data[0];
        }
        return data;
    }
    
    function get(url, terms, options){
        let config = {};
        
        terms = terms || {};
        url = urlFormat(url, terms);
        
        return $http.get(url, config)
            .then((response) => {
                let data = response.data;
                return resolveData(data, options);
            });
    }
    
    return get;
}

class HttpGetProvider {
    $get($http, urlFormat) {
        'ngInject';
        return httpGetFactory($http, urlFormat);
    }
}

export default HttpGetProvider;