import { Component } from '@angular/core';
import { CaloriasHasDietas } from '../../modelos/calorias-has-dietas.model';
import { CaloriasHasDietasService } from '../../servicios/calorias-has-dietas.service';
import { User } from '../../modelos/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [GlobalComponent, CommonModule],
  providers: [CaloriasHasDietasService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  listaCaloriasDietas:CaloriasHasDietas []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private caloriasDietasService: CaloriasHasDietasService,private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarCaloriasDietas();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarCaloriasDietas():void{
    this.caloriasDietasService.getCaloriasDietas(this.clave).subscribe(data=>{
      this.listaCaloriasDietas = data;
    },
    err =>{
      console.log(err);
    });
  }

  deleteCaloriasDietas(id:any): void {
    this.caloriasDietasService.deleteCaloriaDieta(id, this.clave).subscribe(data=>{
      this.cargarCaloriasDietas();
    },
    err =>{
      console.log(err);
    });
  }



}
