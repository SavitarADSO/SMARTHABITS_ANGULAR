import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dieta } from '../modelos/dieta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  url='http://127.0.0.1:8000/api/dietas';
  constructor(private http:HttpClient){
  }
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

  getDietas(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }

  addDieta(dieta:Dieta, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, dieta, options);
  }

  getDieta(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+"/"+id, options);
  }

  updateDieta(id:string, dieta:Dieta, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+"/"+id, dieta, options);
  }

  deleteDieta(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+"/"+id, options);
  }
}
