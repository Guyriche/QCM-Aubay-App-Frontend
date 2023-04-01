import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PassageService } from 'src/app/services/passage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { DetailPassageComponent } from '../details/detail-passage/detail-passage.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { PassageComponent } from '../dialog/passage/passage.component';
import { TestPassageComponent } from '../dialog/test-passage/test-passage.component';

@Component({
  selector: 'app-manage-passage',
  templateUrl: './manage-passage.component.html',
  styleUrls: ['./manage-passage.component.css']
})

export class ManagePassageComponent implements OnInit{

  displayedColumns: string[] = ['ref', 'date_creation', 'candidate', 'score', 'status_passage','edit'];
  dataSource:any;
  managePassageForm:any = FormGroup;
  passages:any = [];
  id:any;
  passage:any

  responseMessage:any;

  constructor(private passageService: PassageService,
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.managePassageForm = this.formBuilder.group({
      test:[null, [Validators.required]]
    })
  }

  tableData(){
    this.passageService.getAllPassage().subscribe({
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
    const dialogRef = this.dialog.open(PassageComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddPassage.subscribe((response)=>{
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
    const dialogRef = this.dialog.open(PassageComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditPassage.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete' + values.ref + 'Passage',
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
    this.passageService.deletePassage(id).subscribe({
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
    const dialogRef = this.dialog.open(TestPassageComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(DetailPassageComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      this.ngxService.start();
      dialogRef.close();
    });
  }

}
