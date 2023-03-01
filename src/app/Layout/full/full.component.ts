import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: 'full.component.html',
  styleUrls: []
})

export class FullComponent implements OnDestroy, AfterViewInit {
  mobilQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobilQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobilQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobilQuery.removeEventListener('change', this._mobileQueryListener);
  }
  ngAfterViewInit() { }

}
