import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PassageService } from 'src/app/services/passage.service';
import { QcmService } from 'src/app/services/qcm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { ShowQcmComponent } from '../dialog/show-qcm/show-qcm.component';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})

export class ManageQuizComponent implements OnInit{

  responseMessage:any;
  dataSource:any;
	tests:any = [];
  qcm:any = [];
  passageId:any;

  constructor(
  private passageService: PassageService,
  private testService: TestService,
  private qcmService: QcmService,
  private ngxService: NgxUiLoaderService, 
  private snackbarService: SnackbarService,
  private router: Router,
  private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.passageId = history.state;
    console.log(history.state.data);
    this.ngxService.start();
    this.tableDataQuiz(this.passageId.data);
  }

  tableDataQuiz(value:any) {
    this.testService.getAllTestByPassageId(value).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tests = response;
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

  handleSubmit(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ShowQcmComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

  /*tablegetAllQcm(){
    let id = this.dialogData.data.id;
    this.qcmService.getAllQcmByTestId(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.qcm = response;
        this.dataSource = new MatTableDataSource(response);
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
  }*/

}
