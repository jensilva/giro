import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PeopleRoles} from './people-roles';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = 'http://localhost:3000/users';


  getUsers(){
    return this.http.get(`${this.baseUrl}`);
  }

  getUser(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }


  getManagers(){
    return this.http.get(`${this.baseUrl}/managers`);
  }

  createUser(user: { name: string; username: string; role: PeopleRoles; cpf: string; password: string }) {
    return this.http.post(`${this.baseUrl}`, user);
  }

  editUser(id: number, user: { name: string; role: PeopleRoles; password?: string }) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
