export class Authentication {
    email: string;
    password: string;

    constructor(username: string, password: string){
        this.email = username;
        this.password = password;
    }
}