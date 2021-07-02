import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-campaign',
  templateUrl: './change-campaign.component.html',
  styleUrls: ['./change-campaign.component.css']
})
export class ChangeCampaignComponent implements OnInit {

  public isDisposableShowing : Boolean = false;
  public isMultipleShowing : Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  clickShowDisposable() {
    this.isDisposableShowing = true;
    this.isMultipleShowing = false;
  }

  clikcShowMultiple() {
    this.isDisposableShowing = false;
    this.isMultipleShowing = true;
  }

}
