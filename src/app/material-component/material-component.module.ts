import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialComponentRoutingModule } from './material-component-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageThemeComponent } from './manage-theme/manage-theme.component';
import { ThemeComponent } from './dialog/theme/theme.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { QuestionComponent } from './dialog/question/question.component';
import { PropositionComponent } from './dialog/proposition/proposition.component';
import { ManagePropositionComponent } from './manage-proposition/manage-proposition.component';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ChangeLanguageComponent } from './dialog/change-language/change-language.component';
import { NgxTranslateModule } from '../translate/translate.module';
import { ManageQcmComponent } from './manage-qcm/manage-qcm.component';
import { QcmComponent } from './dialog/qcm/qcm.component';
import { QuestionQcmComponent } from './dialog/question-qcm/question-qcm.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { DetailQcmComponent } from './details/detail-qcm/detail-qcm.component';
import { QuestionPropositionComponent } from './dialog/question-proposition/question-proposition.component';
import { DetailQuestionComponent } from './details/detail-question/detail-question.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { QcmTestComponent } from './dialog/qcm-test/qcm-test.component';
import { TestComponent } from './dialog/test/test.component';
import { DetailTestComponent } from './details/detail-test/detail-test.component';
import { PassageComponent } from './dialog/passage/passage.component';
import { ManagePassageComponent } from './manage-passage/manage-passage.component';
import { TestPassageComponent } from './dialog/test-passage/test-passage.component';
import { DetailPassageComponent } from './details/detail-passage/detail-passage.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { ShowQcmComponent } from './dialog/show-qcm/show-qcm.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageThemeComponent,
    ThemeComponent,
    ManageQuestionComponent,
    QuestionComponent,
    PropositionComponent,
    ManagePropositionComponent,
    ChangeLanguageComponent,
    ManageQcmComponent,
    QcmComponent,
    QuestionQcmComponent,
    ManageUserComponent,
    DetailQcmComponent,
    QuestionPropositionComponent,
    DetailQuestionComponent,
    ManageTestComponent,
    QcmTestComponent,
    TestComponent,
    DetailTestComponent,
    PassageComponent,
    ManagePassageComponent,
    TestPassageComponent,
    DetailPassageComponent,
    ManageQuizComponent,
    ShowQcmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialComponentRoutingModule),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    NgcCookieConsentModule,
    NgxTranslateModule
    
  ],
  providers: []
})
export class MaterialComponentModule { }
