import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckBoxComponent } from './checkbox.component';
import { CheckboxService } from './checkbox.service';

@NgModule({
  imports: [CommonModule],
  declarations: [CheckBoxComponent],
  exports: [CheckBoxComponent],
  providers: [CheckboxService]
})
export class CheckBoxModule {

}
