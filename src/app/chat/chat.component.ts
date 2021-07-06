import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInFeed } from './../model/feed/userInFeed';
import { ProfileDTO } from './../model/profile/profileDTO';
import { FollowService } from './../service/follow/follow.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../model/chat/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  curUsr
  chatSelected : boolean = false
  profileDTO
  users=[new UserInFeed('1', 'user1', "https://bootdey.com/img/Content/avatar/avatar2.png"), new UserInFeed('2', 'user2', "https://bootdey.com/img/Content/avatar/avatar1.png"), new UserInFeed('3', 'user3', "https://bootdey.com/img/Content/avatar/avatar3.png")]
  userChatting =new UserInFeed('22', 'jaBre', "https://bootdey.com/img/Content/avatar/avatar4.png")
  userChattingWith
  searchString : string =""
  message:string=""
  public messageForm : FormGroup
  public searchForm : FormGroup

  messagesfromUser1 = [new Message('1', "Alo bre maune jean", new Date() ),new Message('1', "Alo bre javi se idiote", new Date() ),new Message('1', "Alo konju", new Date() )]

  constructor(    public followService : FollowService) { }

  ngOnInit(): void {
    // this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    // this.profileDTO = new ProfileDTO(this.curUsr.id)
    this.messageForm = new FormGroup({
      'message': new FormControl(null, Validators.required)
    })

    this.searchForm = new FormGroup({
      'search': new FormControl(null, Validators.required)
    })

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
    console.log(user)
    this.chatSelected = true
    this.userChattingWith = user
  }
  sendMessage(){
    console.log(this.message)
  }
  search(){
    console.log(this.searchString)
  }
}
