import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = 'http://localhost:3000/teams';


  getTeams(includeMembers: boolean = false) {
    return this.http.get(`${this.baseUrl}`, {
      params: { includeMembers: includeMembers.toString() }
    });
  }

  getTeam(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  editTeam(id: number, team: { name: string; description: string; members: any[]; projects: any[] }) {
    return this.http.put(`${this.baseUrl}/${id}`, team);
  }

  createTeam(team: any) {
    return this.http.post(`${this.baseUrl}`, team)
  }

  deleteTeam(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
