import { Injectable } from '@angular/core';
import { IAppState } from './store/store';
import { NgRedux } from 'ng2-redux';
import { TeamService } from '../services/team.service';

@Injectable()
export class TeamAction {
    static TEAM_GET = 'TEAM_GET';
    static TEAM_POST = 'TEAM_POST';

    constructor(private ngRedux: NgRedux<IAppState>, private teamService: TeamService) { }

    get() {
        this.teamService.getAllTeam().subscribe((data: any) => {

            if (data.length === 0) {
                return;
            }

            this.ngRedux.dispatch({
                type: TeamAction.TEAM_GET,
                payload: data
            });
        });
    }

    post(team) {
        this.teamService.post(team).subscribe(r => {
            this.get();
        });
    }

}