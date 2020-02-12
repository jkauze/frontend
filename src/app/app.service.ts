import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const API = environment.api_url_do;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getRooms(url: string): Observable<Rooms[]>{
      return this.http.get<Rooms[]>(API + url);
  }

  getItems(url: string): Observable<Items[]>{
    return this.http.get<Items[]>(API + url);
  }
}