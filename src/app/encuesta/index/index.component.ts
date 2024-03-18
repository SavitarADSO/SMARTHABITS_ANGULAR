import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from '../../modelos/encuesta.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [GlobalComponent, CommonModule ],
  providers: [EncuestaService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  listaEncuestas:Encuesta []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private encuestaService: EncuestaService,private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarEncuestas();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarEncuestas():void{
    this.encuestaService.getEncuestas(this.clave).subscribe(data=>{
      this.listaEncuestas = data;
    },
    err =>{
      console.log(err);
    });
  }

  deleteEncuestas(id:any): void {
    this.encuestaService.deleteEncuesta(id, this.clave).subscribe(data=>{
      this.cargarEncuestas();
    },
    err =>{
      console.log(err);
    });
  }


}
