import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PropositionService } from 'src/app/services/proposition.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.css']
})

export class DetailQuestionComponent implements OnInit{

  displayedColumns: string[] = ['num_proposition', 'content_proposition'];
  dataSource:any;
  data:any;
  manageDetailQuestionForm:any = FormGroup;
  question:any;

  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<DetailQuestionComponent>,
  private propositionService:PropositionService,
  private snackbarService:SnackbarService,
  private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.data = this.dialogData.data;
    this.getDetailQuestionById(this.data.id);
  }

  getDetailQuestionById(id: any) {
    this.propositionService.getAllPropositionByQuestionsId(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },error:(error:any)=>{
        this.ngxService.stop();
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
