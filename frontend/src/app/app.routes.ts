import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import {Register} from './auth/register/register';
import {Dashboard} from './dashboard/dashboard';
import {Home} from './dashboard/home/home';
import {Peoples} from './dashboard/peoples/peoples';
import {Projects} from './dashboard/projects/projects';
import {Teams} from './dashboard/teams/teams';
import {Project} from './dashboard/projects/project/project';
import {ProjectDelete} from './dashboard/projects/project-delete/project-delete';
import {User} from './dashboard/peoples/user/user';
import {authGuard} from './auth/auth-guard';
import {UserDelete} from './dashboard/peoples/user-delete/user-delete';
import {Team} from './dashboard/teams/team/team';
import {TeamDelete} from './dashboard/teams/team-delete/team-delete';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "prefix",
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        pathMatch: "prefix",
        redirectTo: '',
      },
      {
        path: '',
        component: Home,
      },
      {
        path: 'peoples',
        component: Peoples,
        children: [
          {
            path: "add",
            component: User,
          },
          {
            path: "edit/:id",
            component: User,
          },
          {
            path: "delete/:id",
            component: UserDelete,
          },
          {
            path: "details/:id",
            component: User,
            data: {
              hideActions: true
            }
          }
        ]
      },
      {
        path: 'projects',
        component: Projects,
        children: [
          {
            path: "add",
            component: Project,
          },
          {
            path: "edit/:id",
            component: Project,
          },
          {
            path: "delete/:id",
            component: ProjectDelete,
          },
          {
            path: "details/:id",
            component: Project,
            data: {
              hideActions: true
            }
          }
        ]
      },
      {
        path: 'teams',
        component: Teams,
        children: [
          {
            path: "add",
            component: Team,
          },
          {
            path: "edit/:id",
            component: Team,
          },
          {
            path: "delete/:id",
            component: TeamDelete,
          },
          {
            path: "details/:id",
            component: Team,
            data: {
              hideActions: true
            }
          }
        ]
      }
    ]
  }
];
