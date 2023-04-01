import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PassageService } from 'src/app/services/passage.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-test-passage',
  templateUrl: './test-passage.component.html',
  styleUrls: ['./test-passage.component.css']
})

export class TestPassageComponent implements OnInit{

  displayedColumns: string[] = ['title_test', 'edit'];
  dataSource:any;
  manageTestForm:any = FormGroup;
  tests:any = [];
  test: any;
  theme:any;
  themes:any = [];
  id:any;
  
  responseMessage:any;
  onAddTestPassage = new EventEmitter();
  testPassageForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private passageService: PassageService,
  private testService: TestService,
  private themeService: ThemeService,
  private formBuilder: FormBuilder,
  private ngxService: NgxUiLoaderService,
  public dialogRef: MatDialogRef<TestPassageComponent>,
  private snackbarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.getThemes();
    this.testPassageForm = this.formBuilder.group({
      title_test: [null, [Validators.required]],
      description_test: [null, [Validators.required]],
      level: [null, [Validators.required]],
      themeId: [null, [Validators.required]],
      userId: [null, [Validators.required]]
    });
    this.manageTestForm = this.formBuilder.group({
      theme: [null, [Validators.required]]
    })
  }

  tableDataTest(id:any){

    this.testService.getTestByThemeId(id).subscribe({
      next: (response:any)=>{
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

  getThemes(){
    this.themeService.getThemes().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.themes = response;
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

  getThemeById(values:any){
    this.themeService.getThemeById(values.id).subscribe({
      next:(response:any)=>{
        this.theme = response;
        this.tableDataTest(this.theme.id);
        console.log(this.theme.questionId);
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

  handleAddTestToPassage(value:any){

    this.ngxService.start();
    let id = this.dialogData.data.id;
    let data = {
      id: value.id,
      title_test: value.title_test,
      description_test: value.description_test,
      level: value.level,
      themeId: value.themeId,
      userId: value.userId
    }

    this.passageService.addTestToPassage(id, data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tests = response;
        this.tableDataTest(this.theme.id);
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
