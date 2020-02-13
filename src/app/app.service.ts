import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const API = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _userId: string;

  constructor(private http: HttpClient) { }
  
  set userId(id: string) {
    this._userId = id;
  }

  get userId(): string {
    return this._userId;
  }

  getRooms(url: string): Observable<Rooms[]>{
      return this.http.get<Rooms[]>(API + url);
  }

  getItems(url: string): Observable<Items[]>{
    return this.http.get<Items[]>(API + url);
  }

  getUsers() {
    return this.http.get(API + 'usuarios/');
  }

  login(username: string) {
    const userData = this.http.get(API + 'usuario/' + username);
    console.log(userData);
    this.userId = username;
  }
}