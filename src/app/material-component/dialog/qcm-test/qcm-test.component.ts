import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-qcm-test',
  templateUrl: './qcm-test.component.html',
  styleUrls: ['./qcm-test.component.css']
})

export class QcmTestComponent implements OnInit{

  displayedColumns: string[] = ['title_qcm', 'edit'];
  dataSource:any;
  manageQcmTestForm:any = FormGroup;
  qcm:any = [];
  
  responseMessage:any;
  onAddQcmToTest = new EventEmitter();
  dialogAction:any = "Add";
  action:any = "Add";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private testService: TestService,
  private qcmService: QcmService,
  private themeService: ThemeService,
  private formBuilder: FormBuilder,
  private ngxService: NgxUiLoaderService,
  public dialogRef: MatDialogRef<QcmTestComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.manageQcmTestForm = this.formBuilder.group({
      title_qcm:[null, [Validators.required]],
      description_qcm:[null, [Validators.required]],
      difficulty_qcm:[null, [Validators.required]],
      num_qcm:[null, [Validators.required]],
      duration_qcm:[null, [Validators.required]]
    })
  }

  tableData(){
    this.qcmService.getAllQcm().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, 
      error: (error:any)=>{
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

  handleAddQcmToTest(value:any){
    this.ngxService.start();
    let id = this.dialogData.data.id;
    let data = {
      id: value.id,
      title_qcm:value.title_qcm,
      description_qcm: value.description_qcm,
      difficulty_qcm: value.difficulty_qcm,
      num_qcm: value.num_qcm,
      duration_qcm: value.duration_qcm
    }

    this.testService.addQcmToTest(id, data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.qcm = response;
        this.tableData();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error.message;
        }
        else{
          this.responseMessage = GlobaConstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage, GlobaConstants.error);
      }
    })
  }

}
