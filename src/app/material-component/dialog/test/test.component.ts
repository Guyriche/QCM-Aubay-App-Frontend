import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TestService } from 'src/app/services/test.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit{

  onAddTest    = new EventEmitter();
  onEditTest   = new EventEmitter();
  onDeleteTest = new EventEmitter();
  onshowTest   = new EventEmitter();

  testForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;
  themes:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private testService: TestService,
  private themeService: ThemeService,
  public dialogRef: MatDialogRef<TestComponent>,
  private snackbarService: SnackbarService,
  private ngxService: NgxUiLoaderService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.testForm = this.formBuilder.group({
      title_test: [null, [Validators.required]],
      description_test: [null, [Validators.required]],
      level: [null, [Validators.required]],
      themeId:[null, [Validators.required]]
    });

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.testForm.patchValue(this.dialogData.data);
    }
    this.getThemes();
  }

  getThemes(){
    this.themeService.getThemes().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.themes = response;
      },
      error:(error:any)=>{
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

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    let formData = this.testForm.value;
    let data = {
      title_test: formData.title_test,
      description_test: formData.description_test,
      level: formData.level,
      themeId: formData.themeId
    }

    this.testService.add(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.onAddTest.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
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

  edit(){
    let formData = this.testForm.value;
    let data = {
      id:this.dialogData.data.id,
      title_test: formData.title_test,
      description_test: formData.description_test,
      level: formData.level,
      themeId: formData.themeId
    }

    this.testService.update(data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.onEditTest.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, "success");
      }, 
      error:(error)=>{
        this.dialogRef.close();
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
