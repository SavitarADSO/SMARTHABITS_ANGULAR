export class Caloria {

    id?:number;
    users_id:number;
    maintenance_calories:string | null | undefined;
    bulking_calories:string | null | undefined;
    cutting_calories:string | null | undefined;
    recomposition_calories:string | null | undefined;


    constructor(id:number, users_id:number, maintenance_calories:string, bulking_calories: string, cutting_calories:string, recomposition_calories:string){
        this.id=id;
        this.users_id=users_id;
        this.maintenance_calories=maintenance_calories;
        this.bulking_calories=bulking_calories;
        this.cutting_calories=cutting_calories;
        this.recomposition_calories=recomposition_calories;

        
    }
}
