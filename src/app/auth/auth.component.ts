import {Component, inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth-tools/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  private userService = inject(AuthService)

  onSubmit(form: NgForm) {
    const {username, password} = form.value
    this.userService.login(username, password)
  }
}
