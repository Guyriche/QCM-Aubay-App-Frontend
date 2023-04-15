import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { PropositionService } from '../services/proposition.service';
import { QcmService } from '../services/qcm.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { GlobaConstants } from '../shared/global-constants';
import { interval } from 'rxjs';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})

export class StartQuizComponent implements OnInit{

  questions:any = [];
  qcmSelected:any;
  qcmSelectedId:any;
  currentQuestion:number = 0;
  lentOfQuestion:any;

  points:any = 0;

  counterTimer:any = 60;
  interval$:any;

  propositions: any = [];
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;

  responseMessage:any;
  progress:string="0";
  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionService,
    private propositionService: PropositionService,
    private qcmService: QcmService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router){}

  ngOnInit(): void {
    this.ngxService.start();
    this.qcmSelectedId = history.state;
    this.getAllQuestionsByQcmId(this.qcmSelectedId.data);
    this.startCounter();
  }

  getAllQuestionsByQcmId(qcmSelected: any) {
    this.questionService.getAllQuestionByQcmId(qcmSelected).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.questions = response;
        this.lentOfQuestion = this.questions.length;
        this.getAllResponseByQuestionId(this.questions[this.currentQuestion].id);
        console.log(this.lentOfQuestion);
        console.log(this.questions);
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

  getQuestionById(questionId:any){
    this.questionService.getQuestionById(questionId).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.qcmSelected = response;
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

  nextQuestion(id:any){
    this.currentQuestion++;
    this.getQuestionById(id);
  }

  previousQuestion(id:any){
    this.currentQuestion--;
    this.getQuestionById(id);
  }

  answer(currentQuestion:number, option:any){

    if(currentQuestion === this.lentOfQuestion){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option){
      this.points+= 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
    else{
      setTimeout(() => {
        this.inCorrectAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      })
      this.points-=10;
    }
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe((val)=>{
      this.counterTimer--;
      if(this.counterTimer===0){
        this.currentQuestion++;
        this.counterTimer=60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counterTimer=0;
  }

  resetCounter(){
    this.stopCounter();
    this.counterTimer = 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestionsByQcmId(this.qcmSelectedId.data);
    this.currentQuestion = 0;
    this.counterTimer=0
    this.points=0;
    this.counterTimer=60;
    this.progress="0";
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.lentOfQuestion)*100).toString();
    return this.progress;
  }

  getAllResponseByQuestionId(questionId:any){
    this.propositionService.getAllPropositionByQuestionsId(questionId).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.propositions = response;
        console.log(this.propositions);
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

