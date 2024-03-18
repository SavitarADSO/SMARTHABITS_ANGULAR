import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../modelos/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url='http://127.0.0.1:8000/api/auth/user/';

  constructor(private http:HttpClient){}

  obtenerOptions(access_token:any){
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    const options = {
      'headers': headers
    }
    return options;
  }

  getUsers(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }

  addUser(enfermedad:User, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, enfermedad, options);
  }

  getUser(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+id, options);
  }

  updateUser(id:string, enfermedad:User, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+id, enfermedad, options);
  }

  deleteUser(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+id, options);
  }
}
