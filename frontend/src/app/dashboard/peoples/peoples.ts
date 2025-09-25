import {Component, inject, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Modal} from '../../shared/ui/modal/modal';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {PeoplesService} from './peoples-service';
import {PeopleRoles} from './people-roles';
import {AuthService} from '../../auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import {ProjectStatus} from '../projects/project/project-status';

@Component({
  selector: 'app-peoples',
  imports: [
    Modal,
    RouterOutlet
  ],
  templateUrl: './peoples.html'
})
export class Peoples implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: Modal;
  readonly router = inject(Router);
  readonly peopleService = inject(PeoplesService);
  readonly authService = inject(AuthService);

  peoples: any
  canModify = this.authService.getRole() !== PeopleRoles.CONTRIBUTOR;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.getTeams();

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
            this.getTeams();
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTeams() {
    this.peopleService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.peoples = data
      })
  }

  openModal(path: string, id?: number) {
    const route = id !== undefined
      ? ['dashboard/peoples', path, id]
      : ['dashboard/peoples', path];

    this.modal.close();

    this.router.navigate(route, { skipLocationChange: true }).then(() => {
      this.modal.open();
    });
  }

  translateRole(role: PeopleRoles) {
      switch (role){
        case PeopleRoles.ADMIN:
          return "Administrador";
        case PeopleRoles.MANAGER:
          return "Gerente";
        case PeopleRoles.CONTRIBUTOR:
          return "Colaborador";
        default:
          return "Desconhecido";
    }
  }
}
