export class RegistrationRequest {
    name : String;
    surname : String;
    username : String;
    email : String;
    address : String;
    phone : String;
    birthday : String;
    gender : String;
    web : String;
    bio : String;
    image : String;

    constructor(name : String, surname : String, username : String, email : String, address : String, 
        birthday : String, gender : String, web : String, bio : String, image : String) {

            this.name = name;
            this.surname = surname;
            this.username = username;
            this.email = email;
            this.address = address;
            this.birthday = birthday;
            this.gender = gender;
            this.web = web;
            this.bio = bio;
            this.image = image;
    }

}