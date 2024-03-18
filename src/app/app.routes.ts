import { Routes } from '@angular/router';
import { BodyComponent } from './inicio/body/body.component';


import { IndexComponent } from './enfermedad/index/index.component';
import { CreateComponent } from './enfermedad/create/create.component';

import { IndexComponent as IndexEjercicio} from './ejercicio/index/index.component';
import { CreateComponent as CreateEjercicio } from './ejercicio/create/create.component';

import { IndexComponent as IndexDieta} from './dieta/index/index.component';
import { CreateComponent as CreateDieta } from './dieta/create/create.component';

import { IndexComponent as IndexActividad} from './actividad/index/index.component';
import { CreateComponent as CreateActividad } from './actividad/create/create.component';

import { IndexComponent as IndexCaloriaDieta} from './calorias_has_dietas/index/index.component';
import { CreateComponent as CreateCaloriaDieta } from './calorias_has_dietas/create/create.component';

import { IndexComponent as IndexUsers} from './users/index/index.component';

import { IndexComponent as IndexEncuesta } from './encuesta/index/index.component';

import { IndexComponent as IndexCaloria } from './caloria/index/index.component';



export const routes: Routes = [
    {path: '', redirectTo:'inicio/body',pathMatch:'full'},
    {path: 'inicio/body', component: BodyComponent },

    {path: 'enfermedad/index', component: IndexComponent },

    {path: 'enfermedad/create', component: CreateComponent },

    {path: 'enfermedad/editar/:id', component: CreateComponent }, 


    {path: 'actividad/index', component: IndexActividad },

    {path: 'actividad/create', component: CreateActividad },

    {path: 'actividad/editar/:id', component: CreateActividad }, 



    
    {path: 'dieta/index', component:IndexDieta},

    {path: 'dieta/create', component: CreateDieta},

    {path: 'dieta/editar/:id', component: CreateDieta },



    {path: 'ejercicio/index', component:IndexEjercicio},

    {path: 'ejercicio/create', component: CreateEjercicio},

    {path: 'ejercicio/editar/:id', component: CreateEjercicio },


    {path: 'calorias_has_dietas/index', component:IndexCaloriaDieta},

    {path: 'calorias_has_dietas/create', component: CreateCaloriaDieta},

    {path: 'calorias_has_dietas/editar/:id', component: CreateCaloriaDieta },



    {path: 'users/index', component:IndexUsers},


    {path: 'encuesta/index', component:IndexEncuesta},
    

    {path: 'caloria/index', component:IndexCaloria},



    
];
