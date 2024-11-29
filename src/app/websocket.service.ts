import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {StompService} from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private stompService: StompService) {
    this.stompService.configure({
      brokerURL: 'http://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      },
      debug: (str) => {
        console.log(str);
      }
    });

    this.stompService.activate();

  }

  subscribeToTopic() {
    this.stompService.subscribe('/topic/some-topic').pipe(
      catchError((err) => {
        console.error('WebSocket error while subscribing:', err);
        return of([]);
      })
    ).subscribe((message) => {
      console.log('Received message:', message);
    });
  }



  getCavesUpdates(): Observable<any> {
    return this.stompService.subscribe('/topic/caves');
  }

}
