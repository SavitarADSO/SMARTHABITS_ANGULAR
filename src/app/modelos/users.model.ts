export class Users {
    id?:number;
    name:string | undefined| null;
    email:string | undefined| null;
    role:string | undefined| null;

    constructor(id:number,  name:string ,email:string, role:string, ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
