import { Component, OnInit } from "@angular/core";

import { Pager } from 'ngx-kit';

@Component({
  templateUrl: './pager.component.html'
})
export class PagerComponent implements OnInit { 
  pager: Pager = new Pager();

  ngOnInit() {
    this.pager.set({
      total: 345,
      pageNo: 1,
      pageSize: 10
    })

    setTimeout(() => {
      this.pager.total = 70;
      this.pager.pageNo = 2;
    }, 1000);

    setTimeout(() => {
      this.pager.set({
        total: 600,
        pageNo: 1
      })
    }, 3000);
  }
}