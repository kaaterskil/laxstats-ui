export const ROUTES = {
    main: {
        home: 'main/home',
        login: 'main/login',
        logout: 'main/logout'
    },
    admin: {
        home: 'admin/home',
        seasons: 'admin/seasons',
        sites: 'admin/sites',
        teams: 'admin/teams',
        violations: 'admin/violations'
    }
};

export const API = {
    main: {
        login: 'api/login',
        logout:'logout',
        schedule: 'api/schedule',
        scoreboard: 'api/scoreboard',
        fields: 'api/sites'
    },
    admin: {
        seasons: 'api/seasons',
        sites: 'api/sites',
        teams: 'api/teams',
        teamSeasons: 'api/teams/:teamId/seasons',
        violations: 'api/violations'
    }
};