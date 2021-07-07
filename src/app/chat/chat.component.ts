import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInFeed } from './../model/feed/userInFeed';
import { ProfileDTO } from './../model/profile/profileDTO';
import { FollowService } from './../service/follow/follow.service';
import { AfterViewChecked, Component, OnDestroy,ElementRef, ViewChild, OnInit } from '@angular/core';
import { MessageServiceService } from '../service/message-service/message-service.service';
import { Message } from '../model/message/message';
import { Profile } from '../model/message/profile';
import { v4 as uuidv4 } from 'uuid'
import { JsonpClientBackend } from '@angular/common/http';
import { ProfileService } from '../service/profile/profile.service';
import { SearchedUser } from '../model/profile/searchedProfile';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatHistory') private myScrollContainer: ElementRef;

  curUsr
  wsConnection : WebSocket;
  wsCurrConnection : WebSocket;
  currUsrProba : string;
  currUsrId : string;
  otherUsr : string;
  chatSelected : boolean = false
  profileDTO
  users=[new UserInFeed('1', 'user1', "https://bootdey.com/img/Content/avatar/avatar2.png"), new UserInFeed('2', 'user2', "https://bootdey.com/img/Content/avatar/avatar1.png"), new UserInFeed('3', 'user3', "https://bootdey.com/img/Content/avatar/avatar3.png")]
  //userChatting =new UserInFeed('22', 'jaBre', "https://bootdey.com/img/Content/avatar/avatar4.png")
  userChattingWith
  searchString : string =""
  message:string=""
  public messageForm : FormGroup
  public searchForm : FormGroup
  public userId : String;
  public interactedUsers : SearchedUser[] = new Array()
  connections : string[] = new Array()

  public messagesfromUser1 : Message[] = new Array()

  public searchedUsers : SearchedUser[] = new Array()

  public isBlocked : boolean = false

  constructor(public followService : FollowService, private messageService : MessageServiceService, private profileService : ProfileService) { }

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
    //this.otherUsr = "424935b1-766c-4f99-b306-9263731518bc";
    this.connectToCurrSocket()

    this.getUsers()

    console.log("UUID: " + uuidv4())

    window.onbeforeunload = () => this.wsConnection.close;
    this.getUsers()

    this.scrollToBottom()

  }

  ngAfterViewChecked() {        
    this.scrollToBottom()
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}




  //TODO: POVEZATI SA SVIM CHATOVIMA A NE SA SVIM FOLLOWINGSIMA
  /*getUsersFollowings(profileDTO){
    this.followService.getFollowing(profileDTO).subscribe(
      res => {
        this.users = res
      }
    )
  }*/
  selectChat(user){
    this.otherUsr = user.id
    let blocked = await this.isUserBlocked(this.currUsrId, this.otherUsr)
    console.log("BLOKIRAN: " + blocked)
    this.connectToSocket()
    console.log(user)
    this.chatSelected = true
    //this.userChattingWith = user
    this.messageService.getMessagesForChat(this.otherUsr, this.currUsrId).subscribe(
      result => {
        if (result === null) {
          this.messagesfromUser1 = new Array()
        } else {
          this.messagesfromUser1 = result
        }
        
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
    this.messageForm.controls.message.setValue("");
  }
  search(){

    console.log("SEARCH STRING: " + this.searchString)
    if (this.searchString == "") {
      this.getUsers()
      return
    }

    this.profileService.searchUser(this.searchString).subscribe(
      res => {
        this.searchedUsers = res;
        console.log(this.searchedUsers)
      },
      err => {
        this.searchedUsers = []
      }
    )

  }

  connectToSocket() {
    
    this.wsConnection = new WebSocket("ws://localhost:8052/ws/" + this.otherUsr + "/dsadsdsa" )

    this.wsConnection.addEventListener('message', (event) => {
      //this.messagesfromUser1.push(event.data)
      //console.log("DSADSAD" + event.data.content)
      let message = JSON.parse(event.data)
      this.messagesfromUser1.push(message)
     
    })
    
  }

  connectToCurrSocket() {
    
    this.wsConnection = new WebSocket("ws://localhost:8052/ws/" + this.currUsrId + "/dsadsdsa" )

    this.wsConnection.addEventListener('message', (event) => {
      let message = JSON.parse(event.data)
      this.messagesfromUser1.push(message)
    
    })
    
  }

  getUsers() {
    this.messageService.getUsers(this.currUsrId).subscribe(
      res => {
        this.searchedUsers = res;
      }
    )
    
  }

  isUserBlocked(blockedBy : string, blockedFor : string) : boolean {
    let blocked = false
    this.messageService.isBlocked(blockedBy, blockedFor).subscribe(
      res => {
        blocked = res.is_blocked
      }
    )
    return blocked
  }
}
