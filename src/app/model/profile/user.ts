export class User{
    name : String;
    surname : String;
    email : String;
    address : String;
    phone : String;
    birthday : Date;
    gender : String;
    web : String;
    bio : String;
    username : String;
    image : String;
    private : boolean;
    category : String;
    
    constructor(name : String, surname : String, email : String, address : String, phone : String, birthday : Date, gender : String,
       web : String, bio : String, username : String, image : String){
      this.name = name;
      this.surname = surname
      this.email = email
      this.address = address
      this.phone = phone
      this.birthday = birthday
      this.gender = gender
      this.web = web
      this.bio = bio
      this.username = username
      this.image = image
  
    }
  }
  