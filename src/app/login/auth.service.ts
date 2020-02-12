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
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsuario(user: string): Observable<any[]>{
        const endPoint = API + 'usuario/' + user.trim() + '@usb.ve';
        return this.http.get<any[]>(endPoint);
  }

}