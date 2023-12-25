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
    return this.http.get(AUTH_API + 'sticky-notes/index', {});
  }

  add(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'sticky-notes/create', data, httpOptions);
  }

  update(data: any, id: Number): Observable<any> {
    return this.http.put(AUTH_API + 'sticky-notes/update?id=' + id, data, httpOptions);
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(AUTH_API + 'sticky-notes/delete?id=' + id);
  }

  position(id: Number, position:any): Observable<any> {
    return this.http.put(AUTH_API + 'sticky-notes/change-position?id=' + id, {position:position}, httpOptions);
  }

}
