import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, AfterContentInit, AfterContentChecked, OnDestroy } from '@angular/core';

import { TabIndexDirective } from './tab-index.directive';
import { TabContentDirective } from './tab-content.directive';

@Component({
  selector: 'nk-tab',
  template: '<ng-content></ng-content>'
})
export class TabComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  length: number;

  /** tab页被激活时添加的class  */
  @Input() tabActiveClass: string;
  /** 默认被激活的tab页  */
  @Input() tabActiveIndex: string;

  @ContentChildren(TabIndexDirective) indexList: QueryList<TabIndexDirective>;
  @ContentChildren(TabContentDirective) contentList: QueryList<TabContentDirective>;

  /** tab切换时的事件，返回tabIndex值  */
  @Output() changeTab = new EventEmitter();

  constructor() { }

  tabInit() {
    const indexList = this.indexList.filter(item => this.tabActiveIndex === item.tabId),
      contentList = this.contentList.filter(item => item.tabContentId === this.tabActiveIndex);

    if (!this.tabActiveIndex || !indexList.length) {

      if (!this.indexList.first || !this.contentList.first) { return; }

      this.indexList.first.addClass(this.tabActiveClass);
      this.contentList.first.show();

    } else {

      indexList.forEach(item => item.addClass(this.tabActiveClass));
      contentList.forEach(item => item.show());
    }
  }

  contentInit() {
    this.length = this.indexList.length;

    this.indexList.forEach(item => {

      item.choose.subscribe((v: string) => {
        this.tabActiveIndex = v;
        this.changeTab.emit(v);

        this.indexList.forEach(index => {
          index.removeClass(this.tabActiveClass);

          if (this.tabActiveIndex === index.tabId) {
            index.addClass(this.tabActiveClass);
          }

        });
        this.contentList.filter(cont => {
          cont.hide();
          return cont.tabContentId === this.tabActiveIndex;
        }).forEach(cont => {
          cont.show();
        });

      });
    });

  }

  ngAfterContentInit() {

    this.tabInit();

    this.contentInit();
  }

  ngAfterContentChecked() {
    if (this.length !== this.indexList.length) {

      if (this.length > this.indexList.length) {
        this.tabInit();
      }

      this.contentInit();
    }
  }

  ngOnDestroy() {
    this.indexList.forEach(item => {
      item.choose.unsubscribe();
    })
  }

}
