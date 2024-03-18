export class Enfermedad {
    id?:number;
    nombre:string | undefined| null;

    constructor(id:number, nombre:string){
        this.id = id;
        this.nombre = nombre;
    }
}
