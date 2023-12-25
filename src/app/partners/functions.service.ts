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
    return this.http.get(AUTH_API + 'partners/index', {});
  }

  add(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'partners/create', data, httpOptions);
  }

  update(data: any, id: Number): Observable<any> {
    return this.http.put(AUTH_API + 'partners/update?id=' + id, data, httpOptions);
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(AUTH_API + 'partners/delete?id=' + id);
  }

  view(id: Number): Observable<any> {
    return this.http.get(AUTH_API + 'partners/view?id=' + id);
  }

  categoryList(): Observable<any> {
    return this.http.get(AUTH_API + 'categories/index', {});
  }

  categoryAdd(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'categories/create', data, httpOptions);
  }

}
