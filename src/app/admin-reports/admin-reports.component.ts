import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { BanUserDialog } from '../dialogs/ban-user-dialog/ban-user.component';
import { StoryDialogComponent } from '../dialogs/story-dialog/story-dialog.component';
import { GetStoryForAdmin } from '../model/reports/getstoryadmin';
import { Report } from '../model/reports/report';
import { ReviewReport } from '../model/reports/reviewReport';
import { RequestVerification } from '../model/request-verification/requestVerification';
import { RequestVerificationToChangeState } from '../model/request-verification/requestVerificationToChangeState';
import { PostService } from '../service/post/postservice';
import { RequestVerificationService } from '../service/request-verification/request-verification.service';

@Component({
  selector: 'app-admin-reports-verification',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor( private toastr : ToastrService, private requestVerificationService : RequestVerificationService, private postService : PostService, private router : Router,  private dialog : MatDialog) { }

  public requestVerifications : RequestVerification[] = new Array()
  public rejectVerification : RequestVerificationToChangeState;
  public criteriaForm : FormGroup;
  public criteria : String[] = ["Pending", "Approved", "Rejected"];
  public reports : Report[];
  public isPending : boolean;


  ngOnInit(): void {
    this.isPending = false;
    this.reports = [];
    this.criteriaForm= new FormGroup({
      'criteria' : new FormControl("", Validators.required),
  
    })
  }
  comboChangeCriteria(e) {
    this.reports = [];
    if(this.criteriaForm.controls.criteria.value==="Pending"){
      this.isPending = true;
      //this.mockPosts();
      this.postService.getAllPendingReports().subscribe(
        res => {
          for(let r of res) {
            r.reportedMediaType = "POST";
            this.reports.push(r)
          }

          this.postService.getAllPendingReportsStory().subscribe(
            res => {
              for (let r of res) {
                r.reportedMediaType = "STORY"
                this.reports.push(r)
              }
            }
          )

          
        }
      )
    }else if(this.criteriaForm.controls.criteria.value==="Approved"){
      // this.mockPosts();
      this.isPending = false;

      this.postService.getAllApprovedReports().subscribe(
        res => {
          for(let r of res) {
            r.reportedMediaType = "POST";
            this.reports.push(r)
          }

          this.postService.getAllApprovedReportsStory().subscribe(
            res => {
              for (let r of res) {
                r.reportedMediaType = "STORY"
                this.reports.push(r)
              }
            })
        }
      )
    } else if (this.criteriaForm.controls.criteria.value === "Rejected") {
      this.isPending = false;

      this.postService.getAllRejectedReports().subscribe(
        res => {
          for(let r of res) {
            r.reportedMediaType = "POST";
            this.reports.push(r)
          }

          this.postService.getAllRejectedReportsStory().subscribe(
            res => {
              for (let r of res) {
                r.reportedMediaType = "STORY"
                this.reports.push(r)
              }
            })
          }
        
      )
        
    }

  }
  reject(report : Report) {
    let reviewReport = new ReviewReport();
    reviewReport.deletePost = false;
    reviewReport.status = "REJECTED";
    reviewReport.reportId = report.id;
    if (report.reportedMediaType === "POST") {
      this.postService.reviewReport(reviewReport).subscribe(
        res => {
          this.toastr.success("Successfully approved and deleted media")
        }), err => {
          this.toastr.error("Sorry, something went wrong")
        }
    } else if(report.reportedMediaType === "STORY") {
      this.postService.reviewReportStory(reviewReport).subscribe(
        res => {
          this.toastr.success("Successfully approved and deleted media")
        }), err => {
          this.toastr.error("Sorry, something went wrong")
        }
    }
  }

  
  approve(report : Report) {
    let reviewReport = new ReviewReport();
    reviewReport.deletePost = true;
    reviewReport.status = "APPROVED";
    reviewReport.reportId = report.id;

    if (report.reportedMediaType === "POST") {
      this.postService.reviewReport(reviewReport).subscribe(
        res => {
          this.toastr.success("Successfully approved and deleted media")
        }), err => {
          this.toastr.error("Sorry, something went wrong")
        }
    } else if(report.reportedMediaType === "STORY") {
      this.postService.reviewReportStory(reviewReport).subscribe(
        res => {
          this.toastr.success("Successfully approved and deleted media")
        }), err => {
          this.toastr.error("Sorry, something went wrong")
        }
    }

      const dialogRef = this.dialog.open(BanUserDialog, {
        width: '35vw',
        height: 'fit-content',
        data: report.reportedPostBy
      });
   }

   goToPost(e : Report) {

    if (e.reportedMediaType === "POST") {
      location.href="/postDetails?postId="+e.postId +"&userId="+e.reportedPostBy.id;
    } else if (e.reportedMediaType === "STORY") {
      let getStory = new GetStoryForAdmin();
      getStory.id = e.postId;
      getStory.storyBy = e.reportedPostBy.id;
      this.postService.getStoryByIdForAdmin(getStory).subscribe(
        res => {
          const dialogRef = this.dialog.open(StoryDialogComponent, {
            width: '35vw',
            height: '90vh',
            data: res
          });
        }
      )
    }
   }



}
