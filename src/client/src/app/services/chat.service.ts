import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import  io from 'socket.io-client';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private api:ApiService) { }

 socket = io(!environment.production ? 'http://localhost:3000/':""
 );

  joinRoom(data:any)
  {
    this.socket.emit('join', data);
  }

  newUserJoined()
  {
    let observable = new Observable<{user:String, message: String}>((observer:any)=>{
      this.socket.on('new user joined', (data: any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  leaveRoom(data: { user: String; room: String; }){
    this.socket.emit('leave',data);
  }

  userLeftRoom(){
    let observable = new Observable<{user:String, message:String}>((observer: { next:any })=>{
      this.socket.on('left room', (data: any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }

  sendMessage(data: { user: String; room: String; message: String; })
  {
    this.socket.emit('message',data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:String, message:String}>((observer: { next: any })=>{
      this.socket.on('new message', (data: any)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });

    return observable;
  }
  
}