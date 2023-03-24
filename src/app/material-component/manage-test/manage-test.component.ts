import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { DetailTestComponent } from '../details/detail-test/detail-test.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { QcmTestComponent } from '../dialog/qcm-test/qcm-test.component';
import { TestComponent } from '../dialog/test/test.component';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls : ['./manage-test.component.css']
})
export class ManageTestComponent implements OnInit{

  displayedColumns: string[] = ['title_test', 'description_test', 'level', 'edit'];
  dataSource:any;
  manageTestForm:any = FormGroup;
  listQcm:any = [];
  id:any;
  qcm:any

  responseMessage:any;

  constructor(private testService: TestService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService: SnackbarService,
    private router: Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.manageTestForm = this.formBuilder.group({
      qcm:[null, [Validators.required]]
    })
  }

  tableData() {
    this.testService.getAllTest().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      error:(error:any)=>{
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

  applyFilter(event: Event){
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TestComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTest.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    this.id = dialogConfig.data.id
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TestComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditTest.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete' + values.title_test + 'Test',
      confirmation:true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=>{
      this.ngxService.start();
      this.deleteTest(values.id);
      dialogRef.close();
    })
  }

  deleteTest(id: any) {
    this.testService.deleteTest(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
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

  handleAddQcmAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(QcmTestComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

  handleAddShowDetails(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Show Detail',
      data:values
    };

    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(DetailTestComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

}
