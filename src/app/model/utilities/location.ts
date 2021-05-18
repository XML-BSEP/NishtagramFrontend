export class Location{
  long : Number
  lat : Number
  city : String
  state : String

  constructor(long : Number, lat : Number, city : String, state : String){
    this.long = long
    this.lat = lat
    this.city = city
    this.state = state
  }
}
