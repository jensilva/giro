import {Component, inject, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Modal} from '../../shared/ui/modal/modal';
import {DatePipe} from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {PeopleRoles} from '../peoples/people-roles';
import {AuthService} from '../../auth/auth.service';
import {ProjectsService} from './projects-service';
import { Subject, takeUntil } from 'rxjs';
import {ProjectStatus} from './project/project-status';

@Component({
  selector: 'app-projects',
  imports: [
    Modal,
    DatePipe,
    RouterOutlet
  ],
  templateUrl: './projects.html',
})
export class Projects implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: Modal;
  readonly router = inject(Router);
  readonly projectsService = inject(ProjectsService);
  readonly authService = inject(AuthService);

  canModify = this.authService.getRole() !== PeopleRoles.CONTRIBUTOR;


  projects: any
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.getProject();

    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const url = this.router.url;
          if (
            !url.includes('/add') &&
            !url.includes('/edit') &&
            !url.includes('/delete')
          ) {
            this.modal.close();
            this.getProject();
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProject() {
    this.projectsService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.projects = data
      })
  }

  openModal(path: string, id?: number) {
    const route = id !== undefined
      ? ['dashboard/projects', path, id]
      : ['dashboard/projects', path];

    this.modal.close();

    this.router.navigate(route, { skipLocationChange: true }).then(() => {
      this.modal.open();
    });
  }

  translateStatus(status: ProjectStatus) {
    switch (status){
      case ProjectStatus.BACKLOG:
        return "Planejado";
      case ProjectStatus.IN_PROGRESS:
        return "Em Andamento";
      case ProjectStatus.DONE:
        return "Concluido";
      case ProjectStatus.CANCELED:
        return "Cancelado";
      default:
        return status;
    }
  }
}
