import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User, USER_TYPE } from './interfaces/user';

const API = environment.api_url;

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

   isAdminUser(): boolean {
    if (!this.user) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.login(userId).then(user => {
          if (user.length > 0) {
            this.user = user[0];
            return this.user && this.user.type === USER_TYPE.LAB_F;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    } else {
      return this.user && this.user.type === USER_TYPE.LAB_F;
    }
  }

  getRooms(url: string): Observable<Rooms[]>{
      return this.http.get<Rooms[]>(API + url);
  }

  getItems(url: string): Observable<Items[]>{
    return this.http.get<Items[]>(API + url);
  }
  
  getRequest(url: String): Observable<any[]>{
    return this.http.get<any[]>(API + url);
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