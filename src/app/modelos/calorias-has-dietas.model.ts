export class CaloriasHasDietas {

    id?:number;
    caloria_id:number;
    dieta_id:number;

   

    constructor(id:number, caloria_id:number, dieta_id:number){
        this.id=id;
        this.caloria_id=caloria_id;
        this.dieta_id=dieta_id;

    }


}
