import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-create-campaing',
  templateUrl: './create-campaing.component.html',
  styleUrls: ['./create-campaing.component.css']
})
export class CreateCampaingComponent implements OnInit,AfterViewInit {
  isLinear = true;
  campaignChecked = "";
  exposeDateDisposableCampaing  = new Date();
  today = new Date();
  public startTimedisposableCampaignTime : String = '00:00';
  public disposableCampaignTime : string = '00:00';

  exposeStartDateMultipleCapaign = new Date();
  exposeEndDateMultipleCapaign = new Date();

  public multipleCampaignStartTime : string = '00:00';
  public multipleCampaignEndTime : string = '00:00';
  

  constructor() { }

  ngOnInit(): void {
 
  }

  ngAfterViewInit() {}
 

  onTimeDisposableCampaignChange(time) {
    this.disposableCampaignTime = time;
    console.log(this.disposableCampaignTime)
    console.log(this.exposeDateDisposableCampaing)
  }

  onStartTimeMulitpleCampaignChange(time) {
    this.disposableCampaignTime = time;
    console.log(this.multipleCampaignStartTime)
    console.log(this.exposeStartDateMultipleCapaign)
  }

  onEndTimeTimeMulitpleCampaignChange(time) {
    this.disposableCampaignTime = time;
    console.log(this.multipleCampaignEndTime)
    console.log(this.exposeEndDateMultipleCapaign)
  }

}
