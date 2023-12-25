import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'https://lineaapi.leopardsolution.com/api/feeds/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(AUTH_API + 'index', {});
  }

  add(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'create', data, httpOptions);
  }

  update(data:any, id:Number): Observable<any> {
    return this.http.put(AUTH_API + 'update?id='+id, data, httpOptions);
  }

  delete(id:Number): Observable<any> {
    return this.http.delete(AUTH_API + 'delete?id='+id);
  }

  view(id:Number): Observable<any> {
    return this.http.get(AUTH_API + 'view?id='+id);
  }

  changeStatus($id:Number, $status:string): Observable<any> {
    return this.http.get(AUTH_API + 'change-status?id='+$id+'&status='+$status);
  }

}
