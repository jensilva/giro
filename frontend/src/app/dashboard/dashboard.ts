import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class Dashboard {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  userName = this.authService.getName();

  menuItems = [
    {
      name: "Gerenciamento",
      to: "",
    },
    {
      name: "Projetos",
      to: "projects",
    },
    {
      name: "Pessoas",
      to: "peoples",
    },
    {
      name: "Times",
      to: "teams",
    },
  ]

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(["/login"])
    })
  }
}
