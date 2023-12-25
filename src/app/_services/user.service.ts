import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://lineaapi.leopardsolution.com/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(API_URL + 'index', {});
  }

  view(id:Number): Observable<any> {
    return this.http.get(API_URL + 'view?id='+id, { });
  }

  dropdownList(): Observable<any> {
    return this.http.get(API_URL + 'select-dropdown', { });
  }

}
