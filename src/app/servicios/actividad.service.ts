import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Actividad } from '../modelos/actividad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  url='http://127.0.0.1:8000/api/actividad/';

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

  getActividades(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }

  addActividad(actividad:Actividad, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, actividad, options);
  }

  getActividad(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+id, options);
  }

  updateActividad(id:string, actividad:Actividad, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+id, actividad, options);
  }

  deleteActividad(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+id, options);
  }


}
