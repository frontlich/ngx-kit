import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DragModule } from 'ngx-kit';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
