export const ROUTES = {
	main: {
		home: 'main/home',
		login: 'main/login',
		logout: 'main/logout'
	},
	admin: {
	    home: 'admin/home',
	    sites: 'admin/sites'
	}
};

export const API = {
    main: {
        login: 'api/login',
        logout: 'logout',
        schedule: 'api/schedule',
        scoreboard: 'api/scoreboard',
        fields: 'api/sites'
    },
    admin: {
        sites: 'api/sites',
        violations: 'api/violations'
    }
};