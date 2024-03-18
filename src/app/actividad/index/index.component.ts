import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../servicios/actividad.service';
import { Actividad } from '../../modelos/actividad.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [ActividadService],
  imports: [CommonModule, GlobalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaActividades:Actividad []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private actividadesService: ActividadService,private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarActividades();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarActividades():void{
    this.actividadesService.getActividades(this.clave).subscribe(data=>{
      this.listaActividades = data;
    },
    err =>{
      console.log(err);
    });
  }

  eliminarActividad(id:any): void {
    this.actividadesService.deleteActividad(id, this.clave).subscribe(data=>{
      this.cargarActividades();
    },
    err =>{ 
      console.log(err);
    });
  }

  editarActividad(id:any): void {
    this._router.navigateByUrl("/actividad/editar/"+id);
  }
}
