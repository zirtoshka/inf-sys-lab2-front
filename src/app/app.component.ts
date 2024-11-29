import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NotificationComponent} from './notification/notification.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, NotificationComponent, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dragon-front';
  // constructor(private webSocketService: WebsocketService) {}
  //
  // ngOnInit() {
  //   this.webSocketService.connect();
  // }
}
