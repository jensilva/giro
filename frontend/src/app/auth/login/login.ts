import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {catchError} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.html'
})
export class Login {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

    handleLogin(form: NgForm){
    this.authService.login(
      form.value.login,
      form.value.password,
    ).pipe(catchError((e) => {
      alert("login ou senha inválidos");
      return e;
    })).subscribe(() => {
      this.router.navigate(["/dashboard"])
    });
  }
}
