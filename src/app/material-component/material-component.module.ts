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


@NgModule({
  declarations: [
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageThemeComponent,
    ThemeComponent,
    ManageQuestionComponent,
    QuestionComponent,
    PropositionComponent,
    ManagePropositionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialComponentRoutingModule),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
    
  ],
  providers: []
})
export class MaterialComponentModule { }
