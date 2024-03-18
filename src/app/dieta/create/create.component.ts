import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { DietaService } from '../../servicios/dieta.service';
import { Dieta } from '../../modelos/dieta.model';


@Component({
  selector: 'app-create',
  standalone: true,
  providers: [DietaService],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule
  ,FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  value='';
  clave: string | null = null;

  dietaForm = this.fb.group({

    diet_type:'',
    recommended_foods:''
  })

  id: string | null;

  constructor(private fb: FormBuilder, private _router: Router, private dietasSevice: DietaService, private aRoute: ActivatedRoute){
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.verEditar();
  }
  verEditar(): void {
    if (this.id != null) {
      this.dietasSevice.getDieta(this.id,this.clave).subscribe(
        data => {
          this.dietaForm.setValue({

            diet_type: data.diet_type,
            recommended_foods: data.recommended_foods
          })
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  agregarDieta(): void {
    const dieta: Dieta = {
      diet_type: this.dietaForm.get('diet_type')?.value,
      recommended_foods: this.dietaForm.get('recommended_foods')?.value
    }

    if (this.id != null) {
      this.dietasSevice.updateDieta(this.id, dieta, this.clave).subscribe(
        data => {
          this._router.navigate(['/dieta/index']);
        },
        err => {
          console.log(err);
          this._router.navigate(['/dieta/index']);
        }
      );

    } else {
      this.dietasSevice.addDieta(dieta, this.clave).subscribe(data => {
        console.log(data);
        this._router.navigate(['/dieta/index']);
      },
        err => {
          console.log(err);
          this._router.navigate(['/dieta/index']);
        }
      );
    }
  }
}
