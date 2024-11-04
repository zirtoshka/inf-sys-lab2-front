import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AuthService} from '../auth-tools/auth.service';
import {NotificationComponent} from '../notification/notification.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzFormItemComponent,
    NzButtonComponent,
    NzInputDirective,
    RouterLink
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private userService = inject(AuthService)


  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    const {userName, password} = this.validateForm.value;
    if (userName && password) {
      this.userService.login(userName, password)
    }else{
      this.userService.makeToast("daad");
    }
    console.log('submit', this.validateForm.value);
  }
}
