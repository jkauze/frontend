import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from './interfaces/user';

const API = environment.api_url_do;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _user: User;

  constructor(private http: HttpClient) { }
  
  set user(id: User) {
    this._user = id;
  }

  get user(): User {
    return this._user;
  }

  getRooms(url: string): Observable<Rooms[]>{
      return this.http.get<Rooms[]>(API + url);
  }

  getItems(url: string): Observable<Items[]>{
    return this.http.get<Items[]>(API + url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API + 'usuarios/');
  }

  async login(username: string): Promise<User[]> {
    const userData = this.http.get<User[]>(API + 'usuario/' + username).toPromise();
    await userData.then((data: User[]) => {
      if (data.length === 1) {
        this.user = data[0];
      }
    });
    return userData;
  }
}