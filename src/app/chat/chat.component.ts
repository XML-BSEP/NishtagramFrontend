import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInFeed } from './../model/feed/userInFeed';
import { ProfileDTO } from './../model/profile/profileDTO';
import { FollowService } from './../service/follow/follow.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageServiceService } from '../service/message-service/message-service.service';
import { Message } from '../model/message/message';
import { Profile } from '../model/message/profile';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  curUsr
  wsConnection : WebSocket
  currUsrProba : string;
  currUsrId : string;
  otherUsr : string;
  chatSelected : boolean = false
  profileDTO
  users=[new UserInFeed('1', 'user1', "https://bootdey.com/img/Content/avatar/avatar2.png"), new UserInFeed('2', 'user2', "https://bootdey.com/img/Content/avatar/avatar1.png"), new UserInFeed('3', 'user3', "https://bootdey.com/img/Content/avatar/avatar3.png")]
  userChatting =new UserInFeed('22', 'jaBre', "https://bootdey.com/img/Content/avatar/avatar4.png")
  userChattingWith
  searchString : string =""
  message:string=""
  public messageForm : FormGroup
  public searchForm : FormGroup
  public userId : String;
  public interactedUsers : string[] = new Array()
  connections : string[] = new Array()

  public messagesfromUser1 : Message[] = new Array()

  constructor(    public followService : FollowService, private messageService : MessageServiceService) { }

  ngOnInit(): void {
    //this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    // this.profileDTO = new ProfileDTO(this.curUsr.id)
    this.messageForm = new FormGroup({
      'message': new FormControl(null, Validators.required)
    })
    this.searchForm = new FormGroup({
      'search': new FormControl(null, Validators.required)
    })

    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.currUsrId = this.curUsr.id; 
    this.otherUsr = "424935b1-766c-4f99-b306-9263731518bc";

    this.getUsers()

    console.log("UUID: " + uuidv4())

    window.onbeforeunload = () => this.wsConnection.close;

  }


  //TODO: POVEZATI SA SVIM CHATOVIMA A NE SA SVIM FOLLOWINGSIMA
  getUsersFollowings(profileDTO){
    this.followService.getFollowing(profileDTO).subscribe(
      res => {
        this.users = res
      }
    )
  }
  selectChat(user){
    this.connectToSocket()
    console.log(user)
    this.chatSelected = true
    this.otherUsr = user
    //this.userChattingWith = user
    this.messageService.getMessagesForChat(user, this.currUsrId).subscribe(
      result => {
        this.messagesfromUser1 = result
        console.log(this.messagesfromUser1)
      }
    )
  }
  sendMessage(){
    let msg = this.messageForm.controls.message.value;
    let message = new Message(new Date(), this.message, "", 0, new Profile(this.currUsrId), new Profile(this.otherUsr))
    //this.messagesfromUser1.push(message)
    console.log(this.messagesfromUser1)
    let messageJson = JSON.stringify(message)
    console.log(messageJson)
    this.wsConnection.send(messageJson)
  }
  search(){
    console.log(this.searchString)
  }

  connectToSocket() {
    let elem = this.connections.find(elem => elem === this.otherUsr)
    console.log("Konekcija: " + elem)
    if (elem != undefined) {
      return
    }

    this.wsConnection = new WebSocket("ws://localhost:8052/ws/" + this.otherUsr + "/" + this.currUsrId)
    
  }

  getUsers() {
    this.messageService.getUsers(this.currUsrId).subscribe(
      res => {
        this.interactedUsers = res;
      }
    )
    
  }

  onMessage(evt : MessageEvent<any>): void {
  
  }
}
