import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Stomp.Client;

  connect() {
    const socket = new SockJS('http://localhost:8080/ws'); // Ваш WebSocket endpoint
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      // Подписка на обновления
      this.stompClient.subscribe('/topic/updates', (message) => {
        console.log('Received update:', JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }
}
