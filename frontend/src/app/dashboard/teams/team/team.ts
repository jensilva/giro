import {Component, inject, OnInit} from '@angular/core';
import {NgSelectComponent} from '@ng-select/ng-select';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PeoplesService} from '../../peoples/peoples-service';
import {TeamsService} from '../teams-service';
import { ProjectsService } from '../../projects/projects-service';

@Component({
  selector: 'app-project',
  imports: [
    NgSelectComponent,
    FormsModule
  ],
  templateUrl: './team.html',
})
export class Team implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectsService);
  private peopleService = inject(PeoplesService);
  private teamService = inject(TeamsService);

  id?: number;
  hideActions: boolean = false;

  team = {
    name: '',
    description: '',
    members: [],
    projects: []
  };

  allPeoples = [];
  allProjects = [];

  ngOnInit() {
    this.peopleService.getUsers().subscribe(peoples => {
      // @ts-ignore
      this.allPeoples = peoples;
    });

    this.projectService.getProjects().subscribe(projects => {
      // @ts-ignore
      this.allProjects = projects;
    })

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.teamService.getTeam(+id).subscribe(team => {
          // @ts-ignore
          this.team = team;
        });
      }
    });

    this.route.data.subscribe(data => {
      this.hideActions  = !!data['hideActions'];
    })
  }

  saveProject() {
    const subscriptionTeam = this.id
      ? this.teamService.editTeam(this.id, this.team)
      : this.teamService.createTeam(this.team)

    subscriptionTeam.subscribe(() => {
      this.router.navigate(['/dashboard/teams'], { skipLocationChange: true });
    });
  }
}
