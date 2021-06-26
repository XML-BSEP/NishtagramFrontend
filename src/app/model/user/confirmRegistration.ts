export class ConfirmRegistration{
  public email : String;
  public code : String;
  public username : String;

  constructor(email : String, code : String, username : String){
    this.email = email;
    this.code = code;
    this.username = username
  }

}
