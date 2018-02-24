import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { NgxKitModule } from "ngx-kit";
import { NgxKitModule } from '../../../src/index';

import {
  APP_COMPONENTS,
  BreadCrumbComponent, SwitcherComponent, TabComponent,
  PagerComponent,
  AutoHeightComponent, DragComponent, TrimComponent
} from './components';

const APP_ROUTES: Routes = [
  {
    path: 'components',
    data: { breadcrumb: '组件' },
    children: [
      { path: 'breadcrumb', data: { breadcrumb: '面包屑导航' }, component: BreadCrumbComponent },
      { path: 'switcher', component: SwitcherComponent },
      { path: 'tab', component: TabComponent },
      { path: 'pager', component: PagerComponent }
    ]
  },
  {
    path: 'directives',
    children: [
      { path: 'autoheight', component: AutoHeightComponent },
      { path: 'drag', component: DragComponent },
      { path: 'trim', component: TrimComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES), FormsModule, NgxKitModule],
  exports: [RouterModule],
  declarations: APP_COMPONENTS
})
export class AppRoutingModule { }