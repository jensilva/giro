import {Component, inject, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Modal} from "../../shared/ui/modal/modal";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {TeamsService} from './teams-service';
import { first, Subject, takeUntil } from 'rxjs';
import {PeopleRoles} from '../peoples/people-roles';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-teams',
    imports: [
        Modal,
        RouterOutlet
    ],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class Teams implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: Modal;
  readonly router = inject(Router);
  readonly teamService = inject(TeamsService);
  readonly authService = inject(AuthService);

  teams: any
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
    this.teamService.getTeams(true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.teams = data
      })
  }

  openModal(path: string, id?: number) {
    const route = id !== undefined
      ? ['dashboard/teams', path, id]
      : ['dashboard/teams', path];

    this.modal.close();

    this.router.navigate(route, { skipLocationChange: true }).then(() => {
      this.modal.open();
    });
  }
}
