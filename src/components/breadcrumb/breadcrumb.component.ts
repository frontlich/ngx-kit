import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

export interface BreadCrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'nk-breadcrumb',
  template: `
  <ul class="breadcrumb">
    <ng-container *ngFor="let item of list;index as i;">
      <li class="breadcrumb-item" *ngIf="item.label" >
        <a [routerLink]="item.url">{{item.label}}</a>
        <span *ngIf="i !== list.length - 1">{{seq}}</span>
      </li>
    </ng-container>
  </ul>
  `,
  styles: [`
  .breadcrumb{
    list-style: none;
  }
  .breadcrumb>.breadcrumb-item{
    display: inline-block;
  }
  .breadcrumb>.breadcrumb-item>a,.breadcrumb>.breadcrumb-item>span{
    color: #a8b1bd;
  }
  .breadcrumb>.breadcrumb-item:last-child>a{
    color: #4a4a4a;
    font-weight: bold;
  }
  `]
})
export class BreadCrumbComponent implements OnInit {
  
  list: Array<BreadCrumbItem> = [];

  /** 设置头部的面包屑  */
  @Input() headCrumbs: Array<BreadCrumbItem> = [{label: '首页', url: '/'}];
  /** 设置分隔符  */
  @Input() seq: string = '\\';

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute) { }

  initBreadCrumb(pathFromRoot: Array<ActivatedRouteSnapshot>) {
    let urlStr = '/';

    const routeList = pathFromRoot
      .filter(item => item.url.length)
      .map(item => {
        urlStr += '/' + item.url[0].path;
        return {
          label: item.data['breadcrumb'],
          url: urlStr
        }
      })
    
      this.list = [...this.headCrumbs, ...routeList];
  }

  ngOnInit() {

    this.initBreadCrumb(this.activedRoute.snapshot.pathFromRoot);
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.initBreadCrumb(this.activedRoute.snapshot.pathFromRoot)
      }
    })
  }
}