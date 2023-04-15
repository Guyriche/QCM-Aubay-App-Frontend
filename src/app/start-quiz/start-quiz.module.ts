import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartQuizComponent } from './start-quiz.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgxTranslateModule } from '../translate/translate.module';
import { StartQuizRoutes } from './start-quiz-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StartQuizRoutes),
    NgcCookieConsentModule,
    NgxTranslateModule
  ],
  declarations: [StartQuizComponent]
})
export class StartQuizModule { }
