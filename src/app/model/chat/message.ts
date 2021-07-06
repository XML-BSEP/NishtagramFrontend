export class Message{
  id:string
  text:string
  timestamp: Date
  constructor(id : string, text : string, timestamp: Date){
    this.id = id
    this.text = text
    this.timestamp = timestamp
  }
}
