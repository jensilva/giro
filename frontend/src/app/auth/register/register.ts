import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {FormsModule, NgForm} from '@angular/forms';
import {PasswordStrengthMeterComponent} from '@wise-community/angular-password-strength-meter';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    NgxMaskDirective,
    FormsModule,
    PasswordStrengthMeterComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './register.html',
})
export class Register {

  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  handleSignUp(f: NgForm) {
    this.authService.signUp({
      name: f.value.fullName,
      cpf: f.value.cpf,
      role: f.value.role,
      username: f.value.login,
      password: f.value.password,
      email: f.value.email
    }).subscribe(() => {
      this.router.navigate(["/dashboard"])
    })
  }
}
