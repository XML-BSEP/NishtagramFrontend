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
  selector: 'app-campaign-requests',
  templateUrl: './campaign-requests.component.html',
  styleUrls: ['./campaign-requests.component.css']
})
export class CampaignRequestsComponent implements OnInit {

  public isDisposableShowing : Boolean = false;
  public isMultipleShowing : Boolean = false;
  public disposableCampaigns : DisposableCampaign[];
  public multipleCampaigns : MultipleCampaign[];

  constructor(private agentService : AgentService, public toastr : ToastrService, private dialog : MatDialog, private datePipe : DatePipe,  private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  clickShowDisposable() {
    this.isDisposableShowing = true;
    this.isMultipleShowing = false;

    this.agentService.getAllDisposableCampaigns().subscribe(
      res => {
        this.disposableCampaigns = res;   
      }, 
      error => {
        this.toastr.error(error);
      }
      
    );
  }

  clikcShowMultiple() {
    this.isDisposableShowing = false;
    this.isMultipleShowing = true;

    this.agentService.getAllMultipleCampaigns().subscribe(
      res => {
        this.multipleCampaigns = res;
        console.log(this.multipleCampaigns)
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

  createDisposableCampaignRequest(a : DisposableCampaign) {

    var infulencerId : String;
    var disposableCampaignRequest = new DisposableCampaignRequest();
    disposableCampaignRequest.disposableCampaign = a;

    this.route.queryParams.subscribe(params => {
      infulencerId = params['id'];
    });

    disposableCampaignRequest.influencerId = infulencerId;

    this.agentService.createDisposableCampaignRequest(disposableCampaignRequest).subscribe(
      res => {
        this.toastr.success("Sent!");
      },
      err => {
        this.toastr.error(err);
      }

    );
  }

  createMultipleCampaignRequest(a : MultipleCampaign) {

    var infulencerId : String;
    var multipleCampaignRequest = new MultipleCampaignRequest();
    multipleCampaignRequest.multipleCampaign = a;

    this.route.queryParams.subscribe(params => {
      infulencerId = params['id'];
    });

    multipleCampaignRequest.influencerId = infulencerId;

    this.agentService.createMultipleCampaignRequest(multipleCampaignRequest).subscribe(
      res => {
        this.toastr.success("Sent!");
      },
      err => {
        this.toastr.error(err);
      }

    );
  }

}
