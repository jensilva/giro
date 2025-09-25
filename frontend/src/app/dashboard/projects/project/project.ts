import {Component, inject, OnInit} from '@angular/core';
import {NgSelectComponent} from '@ng-select/ng-select';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../projects-service';
import {FormsModule} from '@angular/forms';
import {ProjectStatus} from './project-status';
import {PeoplesService} from '../../peoples/peoples-service';
import {TeamsService} from '../../teams/teams-service';

@Component({
  selector: 'app-project',
  imports: [
    NgSelectComponent,
    FormsModule
  ],
  templateUrl: './project.html',
})
export class Project implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectsService);
  private peopleService = inject(PeoplesService);
  private teamService = inject(TeamsService);

  hideActions: boolean = false;
  id?: number;

  project = {
    name: '',
    description: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '',
    status: ProjectStatus.BACKLOG,
    managerId: undefined,
    teams: []
  };

  statuses = [
    {
      namePt: "Planejado",
      nameEn: ProjectStatus.BACKLOG,
    },
    {
      namePt: "Em andamento",
      nameEn: ProjectStatus.IN_PROGRESS,
    },
    {
      namePt: "Concluído",
      nameEn: ProjectStatus.DONE,
    },
    {
      namePt: "Cancelado",
      nameEn: ProjectStatus.CANCELED,
    }
  ]

  allTeams = [];
  managers = [];

  ngOnInit() {
    this.peopleService.getManagers().subscribe(managers => {
      // @ts-ignore
      this.managers = managers;
    });

    this.teamService.getTeams().subscribe(teams => {
      // @ts-ignore
      this.allTeams = teams;
    })

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.projectService.getProject(+id).subscribe(project => {
          // @ts-ignore
          const start = new Date(project.startDate);

          // @ts-ignore
          project.startDate = start.toISOString().slice(0, 10);

          // @ts-ignore
          if(project.endDate){
            // @ts-ignore
            const end = new Date(project.endDate);

            // @ts-ignore
            project.endDate = end.toISOString().slice(0, 10);
          }

          // @ts-ignore
          this.project = project;
        });
      }
    });

    this.route.data.subscribe(data => {
        this.hideActions  = !!data['hideActions'];
    })
  }

  saveProject() {
    const subscriptionProject = this.id
      ? this.projectService.editProject(this.id, this.project)
      : this.projectService.createProject(this.project)

    subscriptionProject.subscribe(() => {
      this.router.navigate(['/dashboard/projects'], { skipLocationChange: true });
    });
  }
}
