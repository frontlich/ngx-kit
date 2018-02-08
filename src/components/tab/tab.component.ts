import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from '@angular/core';

import { TabIndexDirective } from './tab-index.directive';
import { TabContentDirective } from './tab-content.directive';

@Component({
  selector: 'nk-tab',
  template: '<ng-content></ng-content>'
})
export class TabComponent {

  length: number;

  /** tab页被激活时添加的class  */
  @Input() tabActiveClass: string;
  /** 默认被激活的tab页  */
  @Input() tabActiveIndex: string;

  @ContentChildren(TabIndexDirective) indexList: QueryList<TabIndexDirective>;
  @ContentChildren(TabContentDirective) contentList: QueryList<TabContentDirective>;

  /** tab切换时的事件，返回tabIndex值  */
  @Output() onTab = new EventEmitter();

  constructor() {}

  tabInit() {
    let indexList = this.indexList.filter(item => this.tabActiveIndex === item.tabId),
        contentList = this.contentList.filter(item => item.tabContentId === this.tabActiveIndex);

    if(!this.tabActiveIndex || !indexList.length){

      if(!this.indexList.first || !this.contentList.first){return};

      this.indexList.first.addClass(this.tabActiveClass);
      this.contentList.first.show();

    }else{

      indexList.forEach(item => item.addClass(this.tabActiveClass));
      contentList.forEach(item => item.show());
    }
  }

  contentInit() {
    this.length = this.indexList.length;

    this.indexList.forEach(item => {

      item.onChoose.subscribe((v: string) => {
        this.tabActiveIndex = v;
        this.onTab.emit(v);

        this.indexList.forEach(item => {
          item.removeClass(this.tabActiveClass);

          if(this.tabActiveIndex === item.tabId){
            item.addClass(this.tabActiveClass);
          }

        })
        this.contentList.filter(item => {
          item.hide();
          return item.tabContentId === this.tabActiveIndex
        }).forEach(item => {
          item.show();
        })
        
      })
    });

  }

  ngAfterContentInit() {
    
    this.tabInit();

    this.contentInit();
  }

  ngAfterContentChecked() {
    if(this.length !== this.indexList.length){

      if(this.length > this.indexList.length){
        this.tabInit();
      }

      this.contentInit();
    }
  }

}