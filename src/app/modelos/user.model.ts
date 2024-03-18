export class User {

    id?:number;
    name:string | null | undefined;
    email:string | null | undefined;
    role:string | null | undefined;
   

    constructor(id:number, name:string, email:string, role:string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.role=role;
        
    }
}
