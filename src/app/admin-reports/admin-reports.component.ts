import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { BanUserDialog } from '../dialogs/ban-user-dialog/ban-user.component';
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
    this.criteriaForm= new FormGroup({
      'criteria' : new FormControl("", Validators.required),
  
    })
  }
  comboChangeCriteria(e) {
    if(this.criteriaForm.controls.criteria.value==="Pending"){
      this.isPending = true;
      //this.mockPosts();
      this.postService.getAllPendingReports().subscribe(
        res => {
          this.reports = res;
        }
      )
    }else if(this.criteriaForm.controls.criteria.value==="Approved"){
      // this.mockPosts();
      this.isPending = false;

      this.postService.getAllApprovedReports().subscribe(
        res => {
          this.reports = res;
          console.log(this.reports)
          console.log(res)
        }
      )
    } else if (this.criteriaForm.controls.criteria.value === "Rejected") {
      this.isPending = false;

      this.postService.getAllRejectedReports().subscribe(
        res => {
          this.reports = res;
          console.log(this.reports)
          console.log(res)
        }
      )
    }

  }
  reject(report : Report) {
    let reviewReport = new ReviewReport();
    reviewReport.deletePost = false;
    reviewReport.status = "REJECTED";
    reviewReport.reportId = report.id;

    this.postService.reviewReport(reviewReport).subscribe(
      res => {
        this.toastr.success("Successfully approved and deleted media")
      }), err => {
        this.toastr.error("Sorry, something went wrong")
      }

  }

  
  approve(report : Report) {
    let reviewReport = new ReviewReport();
    reviewReport.deletePost = true;
    reviewReport.status = "APPROVED";
    reviewReport.reportId = report.id;

    this.postService.reviewReport(reviewReport).subscribe(
      res => {
        this.toastr.success("Successfully approved and deleted media")
      }), err => {
        this.toastr.error("Sorry, something went wrong")
      }

      const dialogRef = this.dialog.open(BanUserDialog, {
        width: '35vw',
        height: 'fit-content',
        data: report.reportedPostBy
      });
   }

   goToPost(e : Report) {
    location.href="/postDetails?postId="+e.postId +"&userId="+e.reportedPostBy.id;
   }



}
