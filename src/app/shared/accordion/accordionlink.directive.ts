import { Directive, HostBinding, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[appAccordionlink]'
})
export class AccordionlinkDirective implements OnInit, OnDestroy {

  @Input()
  public group: any;

  @HostBinding('class.selected')
  @Input()
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  protected _selected: boolean = false;
  protected nav: AccordionDirective;

  constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
    this.nav = nav
  }
  ngOnDestroy(): void {
    this.nav.addLink(this);
  }
  ngOnInit(): void {
    this.nav.removeGroup(this);
  }

  toggle(): any {
    this.selected = !this.selected;
  }

}