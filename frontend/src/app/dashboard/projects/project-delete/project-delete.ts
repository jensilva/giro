import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../projects-service';

@Component({
  selector: 'app-project-delete',
  imports: [],
  templateUrl: './project-delete.html',
})
export class ProjectDelete implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  private projectService = inject(ProjectsService);

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
    this.projectService.deleteProject(this.id).subscribe(() => {
      this.router.navigate(['/dashboard/projects'], { skipLocationChange: true });
    })
  }

  cancelDelete() {
    this.router.navigate(['/dashboard/projects'], { skipLocationChange: true });
  }
}
