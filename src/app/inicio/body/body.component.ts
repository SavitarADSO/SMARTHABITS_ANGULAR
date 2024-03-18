import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { Login } from '../../modelos/login.model';
import { GlobalComponent } from '../../global/global.component';
import { User } from '../../modelos/user.model';


@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers:[LoginService],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  loginForm = this.fb.group({
    email:'',
    password:''
  })

  respuesta: Login | null = null;
  clave: string | null = null;
  usuario: User | null = null;



  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }


  ngOnInit(): void {
    this.clave=localStorage.getItem("clave");
    if (this.clave) {
      this.router.navigate(['/enfermedad/index']);
      
    }
  }

  ngOnChanges(): void {

  }
  login(): void {
    
    this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe( rs => {
        this.respuesta = rs;
       
        if (this.respuesta != null) {
          GlobalComponent.respuesta = this.respuesta;
          localStorage.setItem('clave', this.respuesta.access_token);
          window.location.reload();
        }
      }, err => {
        console.log(err);
      });
  }

}
