import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detail-qcm',
  templateUrl: './detail-qcm.component.html',
  styleUrls: ['./detail-qcm.component.css']
})

export class DetailQcmComponent implements OnInit{

  displayedColumns: string[] = ['num_question','content_question'];
  dataSource:any;
  data:any;
  manageDetailQcmForm:any = FormGroup;
  qcm:any;
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<DetailQcmComponent>,
  private qcmService: QcmService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService){}

  ngOnInit(): void {
    //this.ngxService.start();
    this.data = this.dialogData.data;
    this.getDetailQuestionByQcmId(this.data.id);
  }

  getDetailQuestionByQcmId(id:any) {
    this.questionService.getAllQuestionByQcmId(id).subscribe({
      next:(response:any)=>{
        //this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error:(error:any)=>{
        //this.ngxService.stop();
        console.log(error.error?.message);
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

}
