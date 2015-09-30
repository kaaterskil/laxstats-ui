import { TEAM_GENDER, LETTER, REGIONS } from '../../core/constants';

var angular = require('angular'),
    self;

class TeamFormController {
    constructor($state, model, Team, ErrorService, sites) {
        'ngInject';
        angular.extend(this, {$state, model, Team, sites, ErrorService});
        
        self = this;
        this.original = angular.copy(model);
        this.genders = TEAM_GENDER;
        this.letters = LETTER;
        this.regions = REGIONS;
        this.errors = {};
    }
    
    btnText() {
        if (this.model.id) {
            return 'Save';
        }
        return 'Create';
    }
    
    onSuccess() {
        self.$state.go('admin.teams.index');
    }
    
    onError(response) {
        self.errors = self.ErrorService.processFormErrors(response.data);
    }
    
    saveOrUpdate() {
        if (this.model.id && this.model.id.length > 0) {
            this.Team.update({id: this.model.id}, this.model, this.onSuccess, this.onError);
        } else {
            let team = new this.Team(this.model);
            team.$save(this.onSuccess, this.onError);
        }
    }
}

export default TeamFormController;