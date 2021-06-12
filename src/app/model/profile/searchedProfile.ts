export class SearchedUser{
    name : String;
    surname : String;
    username : String;
    image : String;
    private : Boolean;
    constructor(name : String, surname : String, privacy : Boolean, username : String, image : String){
      this.name = name;
      this.surname = surname
      this.username = username
      this.image = image
      this.private = privacy
  
    }
  }
  