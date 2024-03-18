import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaloriaService } from '../../servicios/caloria.service';
import { Caloria } from '../../modelos/caloria.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [GlobalComponent, CommonModule],
  providers: [CaloriaService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  
  listaCalorias:Caloria []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private caloriaService: CaloriaService, private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarCalorias();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarCalorias():void{
    this.caloriaService.getCalorias(this.clave).subscribe(data=>{
      this.listaCalorias = data;
    },
    err =>{
      console.log(err);
    });
  }

  deleteCalorias(id:any): void {
    this.caloriaService.deleteCaloria(id, this.clave).subscribe(data=>{
      this.cargarCalorias();
    },
    err =>{
      console.log(err);
    });
  }




}
