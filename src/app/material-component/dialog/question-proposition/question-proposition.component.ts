import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuestionService } from 'src/app/services/question.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobaConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-question-proposition',
  templateUrl: './question-proposition.component.html',
  styleUrls: ['./question-proposition.component.css']
})

export class QuestionPropositionComponent implements OnInit {

  displayedColumns: string[] = ['content_proposition', 'edit'];
  dataSource:any;
  managePropositionForm:any = FormGroup;

  responseMessage:any;
  propositions:any = [];
  proposition:any;
  id:any;

  onAddPropositionQuestion = new EventEmitter();
  questionPropositionForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private propositionService: PropositionService,
  private questionService: QuestionService,
  private formBuilder: FormBuilder,
  private ngxService: NgxUiLoaderService,
  private dialogRef: MatDialogRef<QuestionPropositionComponent>,
  private snackbarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.getAllProposition();
    this.questionPropositionForm = this.formBuilder.group({
      content_proposition: [null, [Validators.required]]
    })
  }

  applyFilter(event: Event){
    const filtervalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }

  getAllProposition() {
    this.propositionService.getProposition().subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.propositions = response;
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

  handleAddPropositionToQuestionId(value:any){
    this.ngxService.start();
    let id = this.dialogData.data.id;
    let data = {
      id: value.id,
      num_proposition: value.num_proposition,
      content_proposition: value.content_proposition,
      status_proposition:value.status_proposition
    }
    console.log(data);

    this.questionService.addPropositionToQuestion(id, data).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.propositions = response;
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

  handleAddAction(){
    
  }

}
