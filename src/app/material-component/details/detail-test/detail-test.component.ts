import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { QcmService } from 'src/app/services/qcm.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-detail-test',
  templateUrl: './detail-test.component.html',
  styleUrls: ['./detail-test.component.css']
})
export class DetailTestComponent implements OnInit{

  displayedColumns: string[] = ['num_qcm', 'title_qcm'];
  dataSource:any;
  data:any;
  manageDetailTestForm:any = FormGroup;
  qcm:any;

  responseMessage:any

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<DetailTestComponent>,
  private qcmService: QcmService,
  private snackbarService: SnackbarService,
  private ngxService: NgxUiLoaderService){}

  ngOnInit(): void {
    //this.ngxService.start();
    this.data = this.dialogData.data;
    this.getDetailTestById(this.data.id);
  }


  getDetailTestById(id: any) {
    this.qcmService.getAllQcmByTestId(id).subscribe({
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
