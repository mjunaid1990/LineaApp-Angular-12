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

  list(id: Number): Observable<any> {
    return this.http.get(AUTH_API + 'comments/index?id='+id, {});
  }

  add(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'comments/create', data, httpOptions);
  }

  reply(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'comments/reply', data, httpOptions);
  }

  commentUpdate(data: any, id: Number): Observable<any> {
    return this.http.put(AUTH_API + 'comments/update?id=' + id, data, httpOptions);
  }

  replyUpdate(data: any, id: Number): Observable<any> {
    return this.http.put(AUTH_API + 'comments/reply-update?id=' + id, data, httpOptions);
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(AUTH_API + 'comments/delete?id=' + id);
  }

}
