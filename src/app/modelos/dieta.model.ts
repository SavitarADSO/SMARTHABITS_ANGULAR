export class Dieta {
    id?:number;
    diet_type:string | undefined| null;
    recommended_foods:string | undefined| null;

    constructor(id:number, diet_type:string, recommended_foods:string, ){
        this.id = id;
        this.diet_type = diet_type;
        this.recommended_foods = recommended_foods;
    }
}
