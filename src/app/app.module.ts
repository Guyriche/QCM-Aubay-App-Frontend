import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FullComponent } from './Layout/full/full.component';
import { HeaderComponent } from './Layout/full/header/header.component';
import { SidebarComponent } from './Layout/full/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { SharedModule } from './shared/shared.module';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  bgsColor: "#7b1fa2",
  fgsColor: "#7b1fa2",
  fgsType:SPINNER.circle,
  fgsSize: 100,
  hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
    
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
