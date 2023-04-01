import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detail-passage',
  templateUrl: './detail-passage.component.html',
  styleUrls: ['./detail-passage.component.css']
})

export class DetailPassageComponent implements OnInit{

  displayedColumns: string[] = ['title_test', 'description_test'];
  dataSource:any;
  data:any;
  manageDetailPassageForm:any = FormGroup;
  test:any;

  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<DetailPassageComponent>,
  private testService: TestService,
  private snackbarService: SnackbarService,
  private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.data = this.dialogData.data;
    this.getDetailPassageById(this.data.id);
  }

  getDetailPassageById(id: any) {
    this.testService.getAllTestByPassageId(id).subscribe({
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

}
