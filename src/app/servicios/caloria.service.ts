import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Caloria } from '../modelos/caloria.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CaloriaService {

  url='http://127.0.0.1:8000/api/caloriass';

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

  getCalorias(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }



  getCaloria(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+"/"+id, options);
  }


  deleteCaloria(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+"/"+id, options);
  }

  
}
