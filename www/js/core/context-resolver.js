const SERVER_URL = {
	development : 'http://localhost:8080/',
	production : 'http://www.laxstats.net/'
};

export function contextResolverFactory($location) {
	'ngInject';

	var baseUrl;

	function setBaseUrl() {
		if ($location.port() == 9001) {
			return SERVER_URL.development;
		}
		return SERVER_URL.production;
	}

	baseUrl = setBaseUrl();

	return {
		baseUrl : baseUrl
	};
}