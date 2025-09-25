import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PeopleRoles} from '../people-roles';
import {NgSelectComponent} from '@ng-select/ng-select';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {PasswordStrengthMeterComponent} from '@wise-community/angular-password-strength-meter';
import {PeoplesService} from '../peoples-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    FormsModule,
    NgSelectComponent,
    NgxMaskDirective,
    PasswordStrengthMeterComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './user.html',
})
export class User implements OnInit {
  readonly peopleService = inject(PeoplesService);
  private router = inject(Router);
  readonly route = inject(ActivatedRoute);

  id?: string;
  hideActions: boolean = false;

  user = {
    name: '',
    username: '',
    role: PeopleRoles.CONTRIBUTOR,
    cpf: '',
    password: '',
    email: ''
  };

  roles = [
    {
      namePt: "Colaborador",
      nameEn: PeopleRoles.CONTRIBUTOR
    },
    {
      namePt: "Gerente",
      nameEn: PeopleRoles.MANAGER
    },
    {
      namePt: "Administrador",
      nameEn: PeopleRoles.ADMIN
    }
  ]

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.peopleService.getUser(+id).subscribe(user => {
          // @ts-ignore
          this.user = user;
        });
      }
    });

    this.route.data.subscribe(data => {
      this.hideActions  = !!data['hideActions'];
    })
  }


  saveUser() {
    const subscriptionProject = this.id
      ? this.peopleService.editUser(+this.id, this.user)
      : this.peopleService.createUser(this.user)

    subscriptionProject.subscribe(() => {
      this.router.navigate(['/dashboard/peoples'], { skipLocationChange: true });
    });
  }
}
