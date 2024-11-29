import {Injectable, OnDestroy} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import {DragonCave} from './dragondto/dragoncave';

export type ListenerCallBack = (message: DragonCave) => void;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy{

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8080/ws');
    this.connection.connect({}, () => {});
  }


  public send(task: DragonCave): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/topic/caves', {}, JSON.stringify(task));
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/topic/caves', message => fun(JSON.parse(message.body)));
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // getCavesUpdates(): Observable<any> {
  //   return this.stompService.subscribe('/topic/caves');
  // }

}
