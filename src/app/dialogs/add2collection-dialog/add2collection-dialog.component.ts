import { UsersCollection } from './../../model/feed/usersCollection';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Post } from 'src/app/model/feed/post';
import { SaveToCollection } from 'src/app/model/feed/saveToCollection';
import { PostService } from 'src/app/service/post/postservice';
import { PostInfo } from 'src/app/feed/feed-card/postinfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add2collection-dialog',
  templateUrl: './add2collection-dialog.component.html',
  styleUrls: ['./add2collection-dialog.component.css']
})
export class Add2collectionDialogComponent implements OnInit {
  collections : UsersCollection[] = new Array()
  constructor(public dialogRef: MatDialogRef<Add2collectionDialogComponent>, private postService : PostService, private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
    this.postService.getAllCollections().subscribe(
      res => {
        this.collections = res
      }
    )
  }
  saveToCollection(collection){
    let postInfo = new PostInfo();
    postInfo.postId = this.data.id;
    postInfo.postBy = this.data.user.id;
    console.log(collection.name)
    postInfo.name = collection.name;
    this.postService.addToCollection(postInfo).subscribe(
      res => {
        this.toastr.info("Added to your collection " + collection.name)
      }, err => {
        this.toastr.error("Service unavailable")
      }
    )
  }
}
