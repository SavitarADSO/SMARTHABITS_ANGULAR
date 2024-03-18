import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { CaloriasHasDietasService } from '../../servicios/calorias-has-dietas.service';
import { CaloriasHasDietas } from '../../modelos/calorias-has-dietas.model';
import { Caloria } from '../../modelos/caloria.model';
import { CaloriaService } from '../../servicios/caloria.service';
import { Dieta } from '../../modelos/dieta.model';
import { DietaService } from '../../servicios/dieta.service';

@Component({
  selector: 'app-create',
  standalone: true,
  providers:[CaloriasHasDietasService, CaloriaService, DietaService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule
    ,FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  calorias:Caloria[]=[];  
  dietas:Dieta[]=[];  

 
  value='';
  clave: string | null = null;

  caloriaDietaForm = this.fb.group({

    caloria_id: null,
    dieta_id: null,
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private caloriasDietasService: CaloriasHasDietasService, private aRoute: ActivatedRoute, private caloriasService  : CaloriaService, private dietaService : DietaService){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.verEditar();
    this.cargarCalorias();
    this.cargarDietas();
    
  }
  
  cargarCalorias():void{
    this.caloriasService.getCalorias(this.clave).subscribe(
      (data)=>{
        this.calorias=data;
        console.log(data);
      },
      (error)=>{
        console.error(error);
        
      }

    )
  }

  cargarDietas():void{
    this.dietaService.getDietas(this.clave).subscribe(
      (data)=>{
        this.dietas=data;
        console.log(data);
      },
      (error)=>{
        console.error(error);
        
      }

    )
  }

  verEditar(): void {
    if (this.id != null) {
      this.caloriasDietasService.getCaloriaDieta(this.id, this.clave).subscribe(
        data => {
          this.caloriaDietaForm.setValue({
            caloria_id: data.caloria_id,
            dieta_id: data.dieta_id
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarCaloriaDieta(): void {
    const caloriaDieta: CaloriasHasDietas = {
      caloria_id: this.caloriaDietaForm.get('caloria_id')?.value!,
      dieta_id: this.caloriaDietaForm.get('dieta_id')?.value!,
    }

    if (this.id != null) {
      this.caloriasDietasService.updateCaloriaDieta(this.id, caloriaDieta, this.clave).subscribe(
        data => {
          this._router.navigate(['/calorias_has_dietas/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/calorias_has_dietas/index']);
        }
      );

    } else {
      this.caloriasDietasService.addCaloriaDieta(caloriaDieta, this.clave).subscribe(data => {
        console.log(data);
        this._router.navigate(['/calorias_has_dietas/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/calorias_has_dietas/index']);
        }
      );
    }
  }

}
