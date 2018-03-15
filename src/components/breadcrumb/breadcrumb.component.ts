import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

export interface BreadCrumbItem {
  label: string;
  url: string;
}

@Component({
  selector: 'nk-breadcrumb',
  template: `
  <ul class="crumb">
    <ng-container *ngFor="let item of list;index as i;">
      <li class="crumb-item" *ngIf="item.label" >
        <a [routerLink]="item.url">{{item.label}}</a>
        <span *ngIf="i !== list.length - 1">{{seq}}</span>
      </li>
    </ng-container>
  </ul>
  `,
  styles: [`
  .crumb{
    list-style: none;
  }
  .crumb>.crumb-item{
    display: inline-block;
  }
  .crumb>.crumb-item>a,.crumb>.crumb-item>span{
    color: #a8b1bd;
  }
  .crumb>.crumb-item:last-child>a{
    color: #4a4a4a;
    font-weight: bold;
  }
  `]
})
export class BreadCrumbComponent implements OnInit, OnDestroy {

  private suber: Subscription;

  list: Array<BreadCrumbItem> = [];

  /** 设置头部的面包屑  */
  @Input() headCrumbs: Array<BreadCrumbItem> = [{ label: '首页', url: '/' }];
  /** 设置分隔符  */
  @Input() seq: string = '\\';

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute) { }

  initBreadCrumb(snapshot: ActivatedRouteSnapshot, path: string = '') {

    if (snapshot.url.length) {
      path += '/' + snapshot.url.map(item => item.path).join('/');
    }

    const breadcrumbLabel = snapshot.data['breadcrumb'];
    if (breadcrumbLabel && breadcrumbLabel !== this.list[this.list.length - 1].label) {
      this.list.push({ label: breadcrumbLabel, url: path });
    }

    if (snapshot.firstChild) {
      this.initBreadCrumb(snapshot.firstChild, path);
    }
  }

  ngOnInit() {
    const rootSnap = this.activedRoute.snapshot.pathFromRoot[0];
    
    this.list = [...this.headCrumbs];
    this.initBreadCrumb(rootSnap);

    this.suber = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.list = [...this.headCrumbs];
        this.initBreadCrumb(rootSnap);
      }
    });
  }

  ngOnDestroy() {
    this.suber.unsubscribe();
  }
}
