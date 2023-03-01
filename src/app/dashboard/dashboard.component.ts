import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobaConstants } from '../shared/global-constants';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

	responseMessage:any;
	data:any;

	ngAfterViewInit() { }

	constructor(private dashbordService: DashboardService,
		private ngxService: NgxUiLoaderService, 
		private snackbarService: SnackbarService) {
			this.ngxService.start();
			this.dashboardData();
	}

	dashboardData() {
		this.dashbordService.getDetails().subscribe({
			next: (response:any)=>{
				this.ngxService.stop();
				this.data = response;
			},
			error: (error:any)=>{
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
