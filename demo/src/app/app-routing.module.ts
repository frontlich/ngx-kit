import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { NgxKitModule } from "ngx-kit";
import { NgxKitModule } from '../../../src/index';

import {
  APP_COMPONENTS,
  BreadCrumbComponent, SwitcherComponent, TabComponent,
  PagerComponent, DatepickerComponent,
  AutoHeightComponent, DragComponent, TrimComponent,
  FactoryPipeComponent, NumToChinesePipeComponent, FileSizePipeComponent
} from './components';

const APP_ROUTES: Routes = [
  {
    path: 'components',
    data: { breadcrumb: '组件' },
    children: [
      { path: 'breadcrumb', data: { breadcrumb: '面包屑导航' }, component: BreadCrumbComponent },
      { path: 'switcher', data: { breadcrumb: '开关' }, component: SwitcherComponent },
      { path: 'tab', data: { breadcrumb: 'tab页切换' }, component: TabComponent },
      { path: 'pager', data: { breadcrumb: '分页器' }, component: PagerComponent },
      { path: 'datepicker', data: { breadcrumb: '日期组件'}, component: DatepickerComponent }
    ]
  },
  {
    path: 'directives',
    data: { breadcrumb: '指令' },
    children: [
      { path: 'autoheight', data: { breadcrumb: '自动高度' }, component: AutoHeightComponent },
      { path: 'drag', data: { breadcrumb: '拖拽' }, component: DragComponent },
      { path: 'trim', data: { breadcrumb: '去除空白符' }, component: TrimComponent }
    ]
  },
  {
    path: 'pipes',
    data: { breadcrumb: '管道' },
    children: [
      { path: 'factory', data: { breadcrumb: '工厂管道' }, component: FactoryPipeComponent },
      { path: 'numToChinese', data: { breadcrumb: '数字转中文' }, component: NumToChinesePipeComponent },
      { path: 'fileSize', data: { breadcrumb: '文件大小' }, component: FileSizePipeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES), FormsModule, NgxKitModule],
  exports: [RouterModule, NgxKitModule],
  declarations: APP_COMPONENTS
})
export class AppRoutingModule { }
