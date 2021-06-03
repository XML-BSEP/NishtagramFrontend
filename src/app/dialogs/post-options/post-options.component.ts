import { Post } from '../../model/feed/post';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
  }

}
