export class Authentication {
    email: string;
    password: string;

    constructor(username: string, passsword: string){
        this.email = username;
        this.password = passsword;
    }
}