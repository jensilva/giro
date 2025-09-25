import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = 'http://localhost:3000/projects';


  getProjects() {
    return this.http.get(`${this.baseUrl}`, {
      withCredentials: true
    });
  }

  getProject(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProject(project: any) {
    return this.http.post(`${this.baseUrl}`, project);
  }

  editProject(id: number, project: any) {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getMineProjects() {
    return this.http.get(`${this.baseUrl}/mine`, {
      withCredentials: true
    });
  }
}
