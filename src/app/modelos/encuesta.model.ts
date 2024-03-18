export class Encuesta {

    id?:number;
    user_id:number;
    actividad_id:number;
    edad:number;
    peso:number;
    genero:string | null | undefined;
    estatura:string | null | undefined;
    enfermedades:string| null| undefined;
   

    constructor(id:number, user_id:number, actividad_id:number, edad: number, peso:number, genero:string, estatura:string, enfermedades:string){
        this.id=id;
        this.user_id=user_id;
        this.actividad_id=actividad_id;
        this.edad=edad;
        this.peso=peso;
        this.estatura=estatura;
        this.genero=genero;
        this.enfermedades=enfermedades;

        
    }
}
