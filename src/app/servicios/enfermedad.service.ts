import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enfermedad } from '../modelos/enfermedad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EnfermedadService {

  url='http://127.0.0.1:8000/api/enfermedades';

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

  getEnfermedades(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }

  addEnfermedad(enfermedad:Enfermedad, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, enfermedad, options);
  }

  getEnfermedad(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+"/"+id, options);
  }

  updateEnfermedad(id:string, enfermedad:Enfermedad, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+"/"+id, enfermedad, options);
  }

  deleteEnfermedad(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+"/"+id, options);
  }
}
