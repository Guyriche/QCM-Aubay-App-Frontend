import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MenuItems } from 'src/app/shared/menu-items';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class SidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  userRole:any;
  token:any = localStorage.getItem('token');
  tokenPayload:any;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.tokenPayload = jwt_decode(this.token);
    this.userRole = this.tokenPayload?.role;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
