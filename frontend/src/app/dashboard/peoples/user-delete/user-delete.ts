import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PeoplesService} from '../peoples-service';

@Component({
  selector: 'app-user-delete',
  imports: [],
  templateUrl: './user-delete.html',
})
export class UserDelete implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  private peopleService = inject(PeoplesService);

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
    this.peopleService.deleteUser(this.id).subscribe(() => {
      this.router.navigate(['/dashboard/peoples'], { skipLocationChange: true });
    })
  }

  cancelDelete() {
    this.router.navigate(['/dashboard/peoples'], { skipLocationChange: true });
  }
}

