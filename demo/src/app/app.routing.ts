import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxKitModule } from "ngx-kit";

import {
  APP_COMPONENTS,
  SwitcherComponent,
  DragComponent, TrimComponent
} from './components';

const APP_ROUTES: Routes = [
  {
    path: 'components',
    children: [
      { path: 'switcher', component: SwitcherComponent }
    ]
  },
  {
    path: 'directives',
    children: [
      { path: 'drag', component: DragComponent },
      { path: 'trim', component: TrimComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES), FormsModule, NgxKitModule],
  declarations: APP_COMPONENTS
})
export class AppRoutingModule { }