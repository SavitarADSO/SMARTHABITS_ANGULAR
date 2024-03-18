import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ActividadService } from '../../servicios/actividad.service';
import { Actividad } from '../../modelos/actividad.model';


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [ActividadService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule
  ,FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})


export class CreateComponent {
  value='';
  clave: string | null = null;

  actividadForm = this.fb.group({
    nivel:'',
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private actividadesSevice: ActividadService, private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.verEditar();
  }
  verEditar(): void {
    if (this.id != null) {
      this.actividadesSevice.getActividad(this.id, this.clave).subscribe(
        data => {
          this.actividadForm.setValue({
            nivel: data.nivel,
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarActividad(): void {
    const actividad: Actividad = {
      nivel: this.actividadForm.get('nivel')?.value,
    }

    if (this.id != null) {
      this.actividadesSevice.updateActividad(this.id, actividad, this.clave).subscribe(
        data => {
          this._router.navigate(['/actividad/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/actividad/index']);
        }
      );

    } else {
      this.actividadesSevice.addActividad(actividad, this.clave).subscribe(data => {
        console.log(data);
        this._router.navigate(['/actividad/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/actividad/index']);
        }
      );
    }
  }
}
