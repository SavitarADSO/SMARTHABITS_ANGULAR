import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CaloriasHasDietas } from '../modelos/calorias-has-dietas.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaloriasHasDietasService {

  url='http://smarthabits.api.adsocidm.com/api/caloriasDietas';
  
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

  getCaloriasDietas(access_token:any):Observable<any>{    
    const options = this.obtenerOptions(access_token);
    return this.http.get<any>(this.url, options);
  }

  addCaloriaDieta(caloriaDieta:CaloriasHasDietas, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.post(this.url, caloriaDieta, options);
  }

  getCaloriaDieta(id:string, access_token:any):Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.get(this.url+"/"+id, options);
  }

  updateCaloriaDieta(id:string, caloriaDieta:CaloriasHasDietas, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.put(this.url+"/"+id, caloriaDieta, options);
  }

  deleteCaloriaDieta(id:string, access_token:any): Observable<any>{
    const options = this.obtenerOptions(access_token);
    return this.http.delete(this.url+"/"+id, options);
  }

}
