import { NgModule } from '@angular/core';

import { AccordionanchiorDirective, AccordionlinkDirective, AccordionDirective } from './accordion';
import { MenuItems } from './menu-items';


@NgModule({
  declarations: [
    AccordionanchiorDirective,
    AccordionlinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionanchiorDirective,
    AccordionlinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
