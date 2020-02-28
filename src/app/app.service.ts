import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from './interfaces/user';
import { Request } from './interfaces/request';
import { Trimester } from './interfaces/trimester';
import { RoomRequest } from './interfaces/room_request';

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

  async isUserType(usertype: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      if (!this.user) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          await this.login(userId).catch(() => reject());
          if (!this.user) {
            resolve(false);
          } else {
            resolve(this.user && this.user.type === usertype);
          }
        } else {
          resolve(false);
        }
      } else {
        resolve(this.user && this.user.type === usertype);
      }
    });
  }

  getRooms(url: string): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(API + url);
  }

  getRoomRequests(): Observable<RoomRequest[]> {
    return this.http.get<RoomRequest[]>(API + 'labf/solicitudes');
  }

  getItems(url: string): Observable<Items[]> {
    return this.http.get<Items[]>(API + url);
  }

  getRequests(url: String): Observable<Request[]> {
    return this.http.get<any[]>(API + url);
  }

  getUsers(users?: string): Observable<User[]> {
    if (users) {
      return this.http.get<User[]>(API + 'usuarios/' + users);
    }
    return this.http.get<User[]>(API + 'usuarios/');
  }

  getAdminLabs(): Observable<any[]> {
    const endPoint = environment.api_url + '/usuarios/admin';
    return this.http.get<any[]>(endPoint);
  }

  getTrimester(): Observable<Trimester[]> {
    return this.http.get<Trimester[]>(API + 'trimestre/ultimo');
  }

  async login(username: string): Promise<User[]> {
    const userData = this.http.get<User[]>(API + 'usuario/' + username).toPromise();
    await userData.then((data: User[]) => {
      if (data.length === 1) {
        this.user = data[0];
        localStorage.setItem('userId', this.user.id);
      }
    });
    return userData;
  }

}