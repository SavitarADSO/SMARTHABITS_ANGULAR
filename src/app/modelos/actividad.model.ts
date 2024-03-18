export class Actividad {
    id?:number;
    nivel:string | undefined| null;

    constructor(id:number, nivel:string){
        this.id = id;
        this.nivel = nivel;
    }
}
