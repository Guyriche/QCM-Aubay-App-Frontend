import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit {

  displayedColumns:string[] = ['firstName','lastName','email','status'];
  dataSource:any;

  responseMessage:any;
  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.userService.getUsers().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
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
  }

  applyFilter(event:Event){
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  onChangeStatus(status:any, id:any){
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id:id
    }

    this.userService.update(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
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

}
