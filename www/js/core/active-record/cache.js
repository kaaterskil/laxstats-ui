var angular = require('angular');

function hashCode(val) {
    if(!val || val.length === 0) {
        return 0;
    }
    if(typeof val === 'number') {
        return val;
    }
    let hash = 0, len = val.length, chr;
    for(let i = 0; i < len; i++) {
        chr = val.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

class ResourceCache {
    constructor(name){
        this._name = name;
        this._store = {};
        this._size = 0;
        this._statistics = {name: name};
    }
    
    get name() {
        return this._name;
    }
    
    get size() {
        return this._size;
    }
    
    _containsHash(hash) {
        return this._store.hasOwnProperty(hash);
    }
    
    containsKey(key){
        if(!key) {
            return false;
        }
        let hash = hashCode(key);
        return this._containsHash(hash);
    }

    get(key){
        if(!key) {
            return null;
        }
        let hash = hashCode(key);
        if(this._containsHash(hash)) {
            return this._store[hash];
        }
        return null;
    }
    
    put(key, value) {
        if(!key) {
            return null;
        }
        let hash = hashCode(key);
        if(this._containsHash(hash)) {
            return this.replace(key, value);
        }
        this._store[hash] = value;
        this._size++;
        return null;
    }
    
    replace(key, newValue){
        if(!key) {
          return null;  
        }
        let hash = hashCode(key),
            oldValue = this._store[hash];
        this._store[hash] = newValue;
        return oldValue !== undefined ? oldValue : null;
    }
    
    remove(key){
        if(!key) {
            return null;
        }
        let hash = hashCode(key);
        if(this._containsHash(hash)) {
            let value = this._store[hash];
            delete this._store[hash];
            this._size--;
            return value;
        }
        return null;
    }
    
    removeAll() {
        this._store = {};
        this._size = 0;
    }
    
    keySet(pk) {
        let set = [];
        for(let hash in this._store) {
            if(this._store.hasOwnProperty(hash)) {
              set.push(this._store[hash][pk]);  
            }
        }
        return set;
    }
    
    values() {
        let list = [];
        for(let hash in this._store) {
            if(this._store.hasOwnProperty(hash)) {
                list.push(this._store[hash]);
            }
        }
        return list;
    }
    
    getStatistics() {
        return angular.extend({}, this._statistics, {size: this._size});
    }
}

class ResourceCacheProvider {
    $get() {
        return ResourceCache;
    }
}

export default ResourceCacheProvider;