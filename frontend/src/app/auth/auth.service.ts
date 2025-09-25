import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = 'http://localhost:3000/auth';
  private userRole: string | null = null;

  private user: any;

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/sign-in`, { username, password });
  }

  signUp(param: { name: string; cpf: string; role: string; username: string; password: string, email: string}) {
    return this.http.post(`${this.baseUrl}/sign-up`, param);
  }

  renewSession() {
    return this.http.post(`${this.baseUrl}/refresh-token`, {});
  }

  logout() {
    this.user = null;
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  checkSession() {
    return this.http.get<{ role: string }>(`${this.baseUrl}/check-session`)
      .pipe(
        tap(response => {
          // @ts-ignore
          if(response?.session){
            // @ts-ignore
            this.user = response.user;
          }
        })
      );
  }

  getName() {
    return this.user?.name;
  }

  getRole() {
    return this.user?.role;
  }
}
