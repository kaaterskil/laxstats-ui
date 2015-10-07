function serializerFactory(deferred) {
    
    function getPrimaryKey(clazzOrInstance) {
        if(clazzOrInstance.constructor == 'Function') {
            return clazzOrInstance.primaryKey;
        }
        return clazzOrInstance.constructor.primaryKey;
    }
    
    function updateInstance(instance, data) {
        let key = getPrimaryKey(instance);
        instance.update(data);
        instance.cache.put(key, instance);
        return deferred(instance);
    }
    
    class Serializer {
        serialize(instance) {
            return JSON.stringify(instance);
        }
        
        deserialize(httpResponse, instance) {
            let data;
            
            if (httpResponse && httpResponse.data) {
                data = httpResponse.data;
            } else {
                data = httpResponse;
            }
            
            return updateInstance(instance, data).then((response) => {
                instance = response;
                return deferred(instance);
            });
        }
    }
    
    return Serializer;
}

class SerializerProvider {
    $get(Deferred) {
        'ngInject';
        return serializerFactory(Deferred);
    }
}

export default SerializerProvider;