import {Component, inject, OnInit} from '@angular/core';
import {ProjectsService} from '../projects/projects-service';
import {DatePipe} from '@angular/common';
import {ProjectStatus} from '../projects/project/project-status';

@Component({
  selector: 'app-home',
  imports: [
    DatePipe
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  readonly projectService = inject(ProjectsService);

  backlog: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  canceled: any[] = [];

  sections =
    [{
      title: "Planejado",
      color: "text-blue-600",
      data: this.backlog,
    },
    {
      title: "Em Andamento",
      color: "text-yellow-600",
      data: this.inProgress,
    },
    {
      title: "Concluido",
      color: "text-green-600",
      data: this.done,
    },
    {
      title: "Cancelado",
      color: "text-red-600",
      data: this.canceled,
    }]

  ngOnInit() {
    this.projectService.getMineProjects().subscribe(projects => {
      // @ts-ignore
      projects.forEach(project => {
        switch (project.status) {
          case ProjectStatus.BACKLOG:
            this.backlog.push(project);
            break;
          case ProjectStatus.IN_PROGRESS:
            this.inProgress.push(project);
            break;
          case ProjectStatus.DONE:
            this.done.push(project);
            break;
          case ProjectStatus.CANCELED:
            this.canceled.push(project);
            break;
        }
      });
    });
  }

  getMembersCount(teams: any){
    return teams
      // @ts-ignore
      .map(team => team.members.length)
      // @ts-ignore
      .reduce((acc, val) => acc + val, 0);
  }
}
