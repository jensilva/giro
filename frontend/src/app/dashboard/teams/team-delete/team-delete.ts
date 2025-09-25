import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamsService} from '../teams-service';

@Component({
  selector: 'app-team-delete',
  imports: [],
  templateUrl: './team-delete.html',
})
export class TeamDelete implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  private teamsService = inject(TeamsService);

  id!: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = id;
      }
    });
  }

  confirmDelete() {
    this.teamsService.deleteTeam(this.id).subscribe(() => {
      this.router.navigate(['/dashboard/teams'], { skipLocationChange: true });
    })
  }

  cancelDelete() {
    this.router.navigate(['/dashboard/teams'], { skipLocationChange: true });
  }
}
