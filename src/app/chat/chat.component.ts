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
import { MatDialog } from '@angular/material/dialog';
import { ShowImageComponent } from '../dialogs/show-image/show-image.component';
import { ThrowStmt } from '@angular/compiler';

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


  private imgFile : string;
  private fileName : string;
  private imgSelected : boolean = false;

  

  constructor(public followService : FollowService, private messageService : MessageServiceService, private profileService : ProfileService, private dialog : MatDialog) { }

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
  async selectChat(user){
    if (this.wsConnection != undefined) {
      this.wsConnection.close()
    }
    if (this.wsCurrConnection != undefined) {
      this.wsCurrConnection.close
    }
    this.otherUsr = user.id
    let blocked = await this.isUserBlocked(this.currUsrId, this.otherUsr)
    if (blocked) {
      return
    }
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
    if(this.imgSelected) {
      let message = new Message("", false, new Date(), "", "", 2, new Profile(this.currUsrId), new Profile(this.otherUsr), this.imgFile, "")
      let messageJson = JSON.stringify(message)
      this.imgFile = "";
      this.fileName = "";
      this.wsConnection.send(messageJson)
      this.imgSelected = false;
    } else {


      let msg = this.messageForm.controls.message.value;
    
      let message = new Message("", false, new Date(), this.message, "", 0, new Profile(this.currUsrId), new Profile(this.otherUsr), "", "")

      let messageJson = JSON.stringify(message)
      this.wsConnection.send(messageJson)
      this.messageForm.controls.message.setValue("");
  }
  
  }
  search(){

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
        
          let message = JSON.parse(event.data)
          this.messagesfromUser1.push(message)
         
        })
      
    
    
    
  }

  connectToCurrSocket() {
    console.log("Usao u connect to cur socket and user id: " + this.currUsrId)
    this.connections.forEach((element) => {
      console.log("ELEMENT: " + element)
      if (element === this.otherUsr) {
        console.log("POSTOJIIIIII")
        this.connections.push(this.otherUsr)
        return
      } else if (element === this.curUsr.id) {
        console.log("POSTOJIIIIII")
        this.connections.push(this.curUsr.id)
        return
      }
    })
    
    this.wsCurrConnection = new WebSocket("ws://localhost:8052/ws/" + this.curUsr.id + "/dsadsdsa" )

    if (this.connections.length === 0) {
      this.connections.push(this.curUsr.id)
    }

    this.wsCurrConnection.addEventListener('message', (event) => {
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

  onFileChanged(e) {
    this.imgFile = "";
    this.fileName = "";
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imgFile = reader.result as string;
            this.fileName = file.name;
            this.imgSelected = true;
            console.log(this.imgSelected);
          };

      
    }

  }

  showImg(m : Message) {

    this.messageService.isAllowedToSee(m.id.toString()).subscribe(
      success => {
        this.dialog.open(ShowImageComponent, {
    
      data: m.image_base_64
    })
      }
    )
    
  }

  removeImg() {
    this.imgFile = "";
    this.fileName = "";
    this.imgSelected = false;
  }
}
