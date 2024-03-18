import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Encuesta } from '../modelos/encuesta.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  url='http://smarthabits.api.adsocidm.com/api/encuestass';

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

  getEncuestas(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }



  getEncuesta(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+"/"+id, options);
  }


  deleteEncuesta(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+"/"+id, options);
  }

 
}
