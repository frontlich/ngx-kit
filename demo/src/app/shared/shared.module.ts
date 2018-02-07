import { NgModule } from '@angular/core';

//import { DragModule } from "./index";
import { DragModule } from "ngx-kit";

@NgModule({
  imports: [DragModule],
  exports: [DragModule]
})
export class SharedModule {}