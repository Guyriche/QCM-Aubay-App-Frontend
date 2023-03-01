import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ThemeComponent } from '../dialog/theme/theme.component';

@Component({
  selector: 'app-manage-theme',
  templateUrl: './manage-theme.component.html',
  styleUrls: ['./manage-theme.component.css']
})
export class ManageThemeComponent implements OnInit {

  displayedColumns: string[] = ['wording', 'description', 'edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private themeService: ThemeService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router){}


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();

  }

  tableData(){
    this.themeService.getThemes().subscribe({
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
    dialogConfig.data= {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ThemeComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTheme.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data= {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ThemeComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTheme.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete '+values.wording+' Theme',
      confirmation:true
    }

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteQuestion(values.id);
      dialogRef.close();
    })
  }

  deleteQuestion(id: any) {
      this.themeService.delete(id).subscribe({
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

  handleShowAction(values:any){}
}
