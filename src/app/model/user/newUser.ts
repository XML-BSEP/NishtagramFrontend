export class NewUser{
  name : String;
  surname : String;
  email : String;
  address : String;
  phone : String;
  birthday : string;
  gender : String;
  web : String;
  bio : String;
  username : String;
  password : String;
  confirmPassword : String;
  image : String;
  private : boolean
  constructor(name : String, surname : String, email : String, address : String, phone : String, birthday : string, gender : String,
     web : String, bio : String, username : String, password : String, confirmPassword : String, image : String, priv : boolean){
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
    this.password = password
    this.confirmPassword = confirmPassword
    this.image = image
    this.private = priv
  }
}
