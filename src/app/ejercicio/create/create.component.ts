import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { EjercicioService } from '../../servicios/ejercicio.service';
import { Ejercicio } from '../../modelos/ejercicio.model';


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [EjercicioService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule
  ,FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value='';
  clave: string | null = null;

  ejercicioForm = this.fb.group({

    routine_type: '',
    days_of_week:'',
    exercises:''
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private ejerciciosService: EjercicioService, private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.verEditar();
  }
  
  verEditar(): void {
    if (this.id != null) {
      this.ejerciciosService.getEjercicio(this.id, this.clave).subscribe(
        data => {
          this.ejercicioForm.setValue({
            routine_type: data.routine_type,
            days_of_week: data.days_of_week,
            exercises: data.exercises
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarEjercicio(): void {
    const ejercicio: Ejercicio = {
      routine_type: this.ejercicioForm.get('routine_type')?.value,
      days_of_week: this.ejercicioForm.get('days_of_week')?.value,
      exercises: this.ejercicioForm.get('exercises')?.value,
    }

    if (this.id != null) {
      this.ejerciciosService.updateEjercicio(this.id, ejercicio, this.clave).subscribe(
        data => {
          this._router.navigate(['/ejercicio/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/ejercicio/index']);
        }
      );

    } else {
      this.ejerciciosService.addEjercicio(ejercicio, this.clave).subscribe(data => {
        console.log(data);
        this._router.navigate(['/ejercicio/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/ejercicio/index']);
        }
      );
    }
  }
}
