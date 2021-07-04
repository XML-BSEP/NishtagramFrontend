import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShowImageComponent } from 'src/app/dialogs/show-image/show-image.component';
import { DisposableCampaign } from 'src/app/model/agent/disposable_campaign';
import { DisposableCampaignRequest } from 'src/app/model/agent/disposable_campaign_request';
import { MultipleCampaign } from 'src/app/model/agent/multiple_campaign';
import { AgentService } from 'src/app/service/agent/agent_service';
import { ActivatedRoute } from '@angular/router';
import { MultipleCampaignRequest } from 'src/app/model/agent/multiple_campaign_request';

@Component({
  selector: 'app-campaign-influencer-request',
  templateUrl: './campaign-influencer-request.component.html',
  styleUrls: ['./campaign-influencer-request.component.css']
})
export class CampaignInfluencerRequestComponent implements OnInit {

  public isDisposableShowing : Boolean = false;
  public isMultipleShowing : Boolean = false;
  public disposableRequests : DisposableCampaignRequest[];
  public multpleRequests : MultipleCampaignRequest[];


  constructor(private agentService : AgentService, public toastr : ToastrService, private dialog : MatDialog, private datePipe : DatePipe,  private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  
  clickShowDisposable() {
    this.isDisposableShowing = true;
    this.isMultipleShowing = false;

    this.agentService.getAllDisposableCampaignRequests().subscribe(
      res => {
        this.disposableRequests = res;   
      }, 
      error => {
        this.toastr.error(error);
      }
      
    );
  }

  clikcShowMultiple() {
    this.isDisposableShowing = false;
    this.isMultipleShowing = true;

    this.agentService.getAllMultipleCampaignRequests().subscribe(
      res => {
        this.multpleRequests = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

  showImageDisposable(a : DisposableCampaign) {
   
    for(var i = 0; i < a.ads.length; i++) {
      const dialogRef = this.dialog.open(ShowImageComponent, {
        width: '35vw',
        height: '90vh',
        data : a.ads[i].media
      });
    }

  }

  showImageMultiple(a : MultipleCampaign) {
   
    for(var i = 0; i < a.ads.length; i++) {
      const dialogRef = this.dialog.open(ShowImageComponent, {
        width: '35vw',
        height: '90vh',
        data : a.ads[i].media
      });
    }

  }

  approveMultipleCampaignRequest(m : MultipleCampaignRequest) {

    this.agentService.approveMultipleCampaignRequest(m).subscribe(
      res => {
        this.toastr.success("Approved");
        location.reload();
      },
      err => {
        this.toastr.error(err)
      }
    );
  }

  approveDisposableCampaignRequest(m : DisposableCampaignRequest) {
    this.agentService.approveDisposableCampaignRequest(m).subscribe(
      res => {
        this.toastr.success("Approved");
        location.reload();
      },
      err => {
        this.toastr.error(err)
      }
    );
  }

  rejectMultipleCampaignRequest(m : MultipleCampaignRequest) {

    this.agentService.rejectMultipleCampaignRequest(m).subscribe(
      res => {
        this.toastr.success("Approved");
        location.reload();
      },
      err => {
        this.toastr.error(err)
      }
    );
  }

  rejectDisposableCampaignRequest(m : DisposableCampaignRequest) {
    this.agentService.rejectDisposableCampaignRequest(m).subscribe(
      res => {
        this.toastr.success("Rejected");
        location.reload();
      },
      err => {
        this.toastr.error(err)
      }
    );
  }

}
