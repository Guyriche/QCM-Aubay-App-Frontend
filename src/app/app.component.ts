import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { LanguageService } from './services/Language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'Aubay QCM System Management !';

  constructor(private ngcookieConsentService: NgcCookieConsentService, 
    private lanuageService: LanguageService){}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.ngcookieConsentService.init(this.ngcookieConsentService.getConfig())
  }

}
