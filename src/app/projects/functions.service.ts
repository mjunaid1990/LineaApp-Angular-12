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
    return this.http.get(AUTH_API + 'projects/index', {});
  }

  add(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'projects/create', data, httpOptions);
  }

  update(data:any, id:Number): Observable<any> {
    return this.http.put(AUTH_API + 'projects/update?id='+id, data, httpOptions);
  }

  delete(id:Number): Observable<any> {
    return this.http.delete(AUTH_API + 'projects/delete?id='+id);
  }

  view(id:Number): Observable<any> {
    return this.http.get(AUTH_API + 'projects/view?id='+id);
  }

  tasksList(id:Number): Observable<any> {
    return this.http.get(AUTH_API + 'projects/view?id='+id);
  }

  getTask(id:Number): Observable<any> {
    return this.http.get(AUTH_API + 'projects-task-lists/view?id='+id);
  }

  taskAdd(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'projects-task-lists/create', data, httpOptions);
  }

  taskUpdate(data:any, id:Number): Observable<any> {
    return this.http.put(AUTH_API + 'projects-task-lists/update?id='+id, data, httpOptions);
  }
  
  taskDelete(id:Number): Observable<any> {
    return this.http.delete(AUTH_API + 'projects-task-lists/delete?id='+id);
  }

  taskDoneByUser(id:Number): Observable<any> {
    return this.http.delete(AUTH_API + 'projects-task-lists/user-done?id='+id);
  }

  taskDoneByAdmin(id:Number): Observable<any> {
    return this.http.delete(AUTH_API + 'projects-task-lists/admin-done?id='+id);
  }

}
