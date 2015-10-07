function urlFormatFactory() {
    function parameterize(url, obj) {
        if(!url) {
            return;
        }
        if(!obj) {
            return url;
        }
        return url.replace(/\:\_*[a-zA-Z]+/g, (param) => {
            param = param.replace(/\:*/, '');
            return obj[param];
        });
    }
    
    function urlFormat(url, terms) {
        if(!url) {
            return;
        }
        if(!terms) {
            return url;
        }
        if(url.match(/\:\_*[a-zA-Z]+/)) {
            url = parameterize(url, terms);
        }
        return url;
    }
    
    return urlFormat;
}

class UrlFormatProvider {
    $get() {
        return urlFormatFactory();
    }
}

export default UrlFormatProvider;