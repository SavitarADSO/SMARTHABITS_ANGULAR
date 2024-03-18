import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { EnfermedadService } from '../../servicios/enfermedad.service';
import { Enfermedad } from '../../modelos/enfermedad.model';


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [EnfermedadService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule
  ,FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value='';
  clave: string | null = null;

  enfermedadForm = this.fb.group({
    nombre:'',
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private enfermedadesSevice: EnfermedadService, private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.verEditar();
  }
  verEditar(): void {
    if (this.id != null) {
      this.enfermedadesSevice.getEnfermedad(this.id, this.clave).subscribe(
        data => {
          this.enfermedadForm.setValue({
            nombre: data.nombre,
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarEnfermedad(): void {
    const enfermedad: Enfermedad = {
      nombre: this.enfermedadForm.get('nombre')?.value,
    }

    if (this.id != null) {
      this.enfermedadesSevice.updateEnfermedad(this.id, enfermedad, this.clave).subscribe(
        data => {
          this._router.navigate(['/enfermedad/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/enfermedad/index']);
        }
      );

    } else {
      this.enfermedadesSevice.addEnfermedad(enfermedad, this.clave).subscribe(data => {
        console.log(data);
        this._router.navigate(['/enfermedad/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/enfermedad/index']);
        }
      );
    }
  }
}
