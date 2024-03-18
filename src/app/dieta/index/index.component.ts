import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietaService } from '../../servicios/dieta.service';
import { Dieta } from '../../modelos/dieta.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';


@Component({
  selector: 'app-index',
  standalone: true,
  providers: [DietaService],
  imports: [CommonModule, GlobalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaDietas:Dieta []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private dietasService: DietaService,
    private _router: Router){}

    ngOnInit(): void {
      this.validarToken();
      this.cargarDietas();
    }
    validarToken(): void{
      if(this.clave==null){
        this.clave=localStorage.getItem("clave");
    
      }
        
      if (!this.clave){
        this._router.navigate(['/inicio/body']);
      }
    
    }  

  cargarDietas():void{
    this.dietasService.getDietas(this.clave).subscribe(data=>{
      this.listaDietas = data;
    },
    err =>{
      console.log(err);
    });
  }
  eliminarDieta(id:any): void {
    this.dietasService.deleteDieta(id, this.clave).subscribe(data=>{
      this.cargarDietas();
    },
    err =>{
      console.log(err);
    });
  }

  editarDieta(id:any): void {
    this._router.navigateByUrl("/dieta/editar/"+id);
  }
}
