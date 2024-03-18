import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../servicios/users.service';
import { User } from '../../modelos/user.model';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global/global.component';



@Component({
  selector: 'app-index',
  standalone: true,
  providers: [UsersService],
  imports: [GlobalComponent,CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  listaUsers:User []=[];

  clave: string | null = null;
  usuario: User | null = null;

  constructor(private usersService: UsersService,private _router: Router){}

  ngOnInit(): void {
    this.validarToken();
    this.cargarUsers();
  }  
  validarToken(): void{
    if(this.clave==null){
      this.clave=localStorage.getItem("clave");
  
    }
      
    if (!this.clave){
      this._router.navigate(['/inicio/body']);
    }
  
  }

  cargarUsers():void{
    this.usersService.getUsers(this.clave).subscribe(data=>{
      this.listaUsers = data;
    },
    err =>{
      console.log(err);
    });
  }

  deleteUsers(id:any): void {
    this.usersService.deleteUser(id, this.clave).subscribe(data=>{
      this.cargarUsers();
    },
    err =>{
      console.log(err);
    });
  }

 
}
