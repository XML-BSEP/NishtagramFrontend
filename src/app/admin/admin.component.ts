import { NewPost } from './../model/createPost/newPost';
import { User } from './../model/profile/user';
import { UserTag } from './../model/createPost/userTag';
import { UserInFeed } from './../model/feed/userInFeed';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/feed/image';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileInput } from 'ngx-material-file-input';
import { PostService } from '../service/post/postservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    ngOnInit() {
        
    }
}