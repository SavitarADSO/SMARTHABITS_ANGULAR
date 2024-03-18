import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjercicioService } from '../../servicios/ejercicio.service';
import { Ejercicio } from '../../modelos/ejercicio.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';


@Component({
  selector: 'app-index',
  standalone: true,
  providers: [EjercicioService, GlobalComponent],
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaEjercicios:Ejercicio []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private ejerciciosService: EjercicioService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarEjercicios();
    }  


    validarToken(): void{
      if(this.clave==null){
        this.clave=localStorage.getItem("clave");
    
      }
        
      if (!this.clave){
        this._router.navigate(['/inicio/body']);
      }
    
    }

  cargarEjercicios():void{
    this.ejerciciosService.getEjercicios(this.clave).subscribe(data=>{
      this.listaEjercicios = data;
    },
    err =>{
      console.log(err);
    });
  }
  eliminarEjercicio(id:any): void {
    this.ejerciciosService.deleteEjercicio(id, this.clave).subscribe(data=>{
      this.cargarEjercicios();
    },
    err =>{
      console.log(err);
    });
  }

  editarEjercicio(id:any): void {
    this._router.navigateByUrl("/ejercicio/editar/"+id);
  }
}
