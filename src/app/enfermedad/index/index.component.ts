import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnfermedadService } from '../../servicios/enfermedad.service';
import { Enfermedad } from '../../modelos/enfermedad.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [EnfermedadService],
  imports: [CommonModule, GlobalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaEnfermedades:Enfermedad []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private enfermedadesService: EnfermedadService,private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarEnfermedades();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarEnfermedades():void{
    this.enfermedadesService.getEnfermedades(this.clave).subscribe(data=>{
      this.listaEnfermedades = data;
    },
    err =>{
      console.log(err);
    });
  }

  eliminarEnfermedad(id:any): void {
    this.enfermedadesService.deleteEnfermedad(id, this.clave).subscribe(data=>{
      this.cargarEnfermedades();
    },
    err =>{
      console.log(err);
    });
  }

  editarEnfermedad(id:any): void {
    this._router.navigateByUrl("/enfermedad/editar/"+id);
  }
}
