import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://lineaapi.leopardsolution.com/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(AUTH_API + 'attendence/index', {});
  }

  add(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'attendence/create', data, httpOptions);
  }

  update(data: any, id: Number): Observable<any> {
    return this.http.put(AUTH_API + 'attendence/update?id=' + id, data, httpOptions);
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(AUTH_API + 'attendence/delete?id=' + id);
  }

  view(id: Number): Observable<any> {
    return this.http.get(AUTH_API + 'attendence/view?id=' + id);
  }

  usersList(): Observable<any> {
    return this.http.get(AUTH_API + 'users/all', {});
  }

}
