import { Component, OnInit } from "@angular/core";

import { Pager } from 'ngx-kit';

@Component({
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit { 
  pager: Pager = new Pager;

  ngOnInit() {
    this.pager.set({
      totalNum: 345,
      totalPage: 35,
      pageNo: 1,
      pageSize: 10
    })
  }
}