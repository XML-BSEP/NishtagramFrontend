import { UsersCollection } from './../../model/feed/usersCollection';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Post } from 'src/app/model/feed/post';
import { SaveToCollection } from 'src/app/model/feed/saveToCollection';

@Component({
  selector: 'app-add2collection-dialog',
  templateUrl: './add2collection-dialog.component.html',
  styleUrls: ['./add2collection-dialog.component.css']
})
export class Add2collectionDialogComponent implements OnInit {
  collections : UsersCollection[] = new Array()
  constructor(public dialogRef: MatDialogRef<Add2collectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post) { }

  ngOnInit(): void {
    this.collections = [new UsersCollection("1", "Moja prva k0lekcija", null), new UsersCollection('2', "Moja druga kolekcija", null), new UsersCollection('3',"formula1", null)]
  }
  saveToCollection(collection){
    var saveToCollDto = new SaveToCollection(collection.id, this.data.id)
    console.log(saveToCollDto)
  }
}
