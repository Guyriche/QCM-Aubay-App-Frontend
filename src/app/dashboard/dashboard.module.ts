import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../shared/material.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { NgxTranslateModule } from '../translate/translate.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    NgcCookieConsentModule,
    NgxTranslateModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }