import { Component, OnInit, Optional, Inject, Input, Output, EventEmitter } from '@angular/core';

import { PAGER_CONFIG_TOKEN, PagerConfig } from './pager.config';

export class Pager {
  totalNum: number = 0;//项目总数
  totalPage: number = 0;//项目总页数
  pageNo: number = 1;//当前页码
  pageSize: number = 10;//每页项目数

  set(k: 'totalNum'|'totalPage'|'pageNo'|'pageSize'|Object, v?:number) {
    if (typeof k === 'string') {
      this[k] = v;
    } else {
      Object.assign(this, k);
    }
  }
}

@Component({
  selector: 'nk-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  pageNumList: string[] = [];

  @Input() data: Pager = new Pager();
  @Output() onDataChange = new EventEmitter();

  constructor(@Optional() @Inject(PAGER_CONFIG_TOKEN) _config: PagerConfig) {
    Object.assign(this, _config || {});
  }

  ngOnInit() {
    this.initPager();
  }

  initPager() {
    let { totalPage: t, pageNo: p } = this.data;
    console.log(t, p);
  }

  changePageSize(n: number) {
    console.log(n)
    this.data.pageSize = n;
  }

}