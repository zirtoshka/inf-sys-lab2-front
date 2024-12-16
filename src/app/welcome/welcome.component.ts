import {Component, inject} from '@angular/core';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import { AuthService } from '../auth-tools/auth.service';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [
    NzButtonComponent,
    RouterLink,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: './welcome.component.html',
  standalone: true,
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
    protected userService = inject(AuthService);

	constructor() {
		this.userService.fetchStatus();
	}
}
