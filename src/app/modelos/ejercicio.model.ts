export class Ejercicio {
    id?:number;
    routine_type:string | undefined| null;
    days_of_week:string | undefined| null;
    exercises:string | undefined| null;

    constructor(id:number, routine_type:string ,days_of_week:string, exercises:string, ){
        this.id = id;
        this.routine_type = routine_type;
        this.days_of_week = days_of_week;
        this.exercises = exercises;
    }
}
