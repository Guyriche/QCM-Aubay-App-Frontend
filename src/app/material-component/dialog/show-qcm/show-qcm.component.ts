import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-show-qcm',
  templateUrl: './show-qcm.component.html',
  styleUrls:  ['./show-qcm.component.css']
})

export class ShowQcmComponent implements OnInit{

  responseMessage:any;
  manageshowQcmForm:any = FormGroup;
  listQcm:any = [];
  qcmselected:any;
  id:any;
  test:any
  status:any;
  qcmselectedId:any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private testService: TestService,
    private qcmService: QcmService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.test = this.dialogData.data;
    this.status = false;
    this.id = this.test.id;
    this.tableDataQcm(this.id);
  }

  tableDataQcm(value:any) {
    this.qcmService.getAllQcmByTestId(value).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.listQcm = response;
        console.log(this.listQcm);
      },
      error:(error:any)=>{
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

  getQcmById(id:any){
    this.qcmService.getQcmById(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.qcmselected = response;
        console.log(this.qcmselected);
      },
      error:(error:any)=>{
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

  gotoQuiz(qcmId:any){
    this.router.navigate(['/aubaytest/startquiz'], {state: {data: qcmId}});
  }

}
