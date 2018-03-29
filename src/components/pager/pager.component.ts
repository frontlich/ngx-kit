import { Component, OnInit, OnDestroy, Optional, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PAGER_CONFIG_TOKEN, PagerConfig } from './pager.config';

export class PagerData {
  total: number;
  pageSize: number;
  pageNo: number;

  constructor(total: number, pageSize: number, pageNo: number) {
    this.total = total;
    this.pageSize = pageSize;
    this.pageNo = pageNo;
  }
}

/**
 * @classdesc 分页器数据对象
 */
export class Pager {

  pagerSubject: Subject<any> = new Subject();

  private _total: number = 0; // 数据总数
  set total(v: number) {
    this._total = v;
    this.pagerSubject.next();
  }
  get total() {
    return this._total;
  }

  private _pageNo: number = 1; // 当前页码
  set pageNo(v: number) {
    this._pageNo = v;
    this.pagerSubject.next();
  }
  get pageNo() {
    return this._pageNo;
  }

  private _pageSize: number = 10; // 每页数量
  set pageSize(v: number) {
    this._pageSize = v;
    this.pagerSubject.next();
  }
  get pageSize() {
    return this._pageSize;
  }

  get pagerData() {
    return new PagerData(this._total, this._pageSize, this._pageNo);
  }

  /** @method set 设置属性的值 */
  set(k: 'total' | 'pageNo' | 'pageSize' | { [x: string]: number }, v?: number) {
    if (typeof k === 'string') {
      this[k] = v;
    } else {
      Object.keys(k).forEach((key: 'total' | 'pageNo' | 'pageSize') => {
        if (k[key] !== this[key]) {
          this[key] = k[key];
        }
      });
    }
  }
}

@Component({
  selector: 'nk-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
  /* template: `
  <div class="page">
    <div class="page-size" *ngIf="!simpleModel">
      显示：
      <a [class.active]="pagerData.pageSize === 10" (click)="changePageSize(10)">10</a>
      <a [class.active]="pagerData.pageSize === 20" (click)="changePageSize(20)">20</a>
      <a [class.active]="pagerData.pageSize === 50" (click)="changePageSize(50)">50</a>
      条/页
      <span style="margin-left: 15px;">共{{pagerData.total}}条</span>
    </div>
    <div class="page-center">
      <ul class="pagination">
        <li class="page-change" (click)="changePageNoTo(-1)" [class.forbidden]="pagerData.pageNo === 1">&lt;</li>
        <li *ngFor="let item of pageNumList" (click)="changePageNo(item)"
          [class.active]="pagerData.pageNo === item"
          [style.cursor]="item === '...' ? 'default' : 'pointer'">{{item}}</li>
        <li class="page-change" (click)="changePageNoTo(1)" [class.forbidden]="pagerData.pageNo === totalPages">&gt;</li>
      </ul>
      <div class="page-go" *ngIf="!simpleModel">
        到第 <input type="text" #pageNo (keyup.enter)="changePageNoTo(0, pageNo.value);pageNo.value='';"> 页
        <button type="button" (click)="changePageNoTo(0, pageNo.value);pageNo.value='';">go</button>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .page {
      position: relative;
      user-select: none;
      line-height: 25px; }
    .page .page-size > a {
      cursor: pointer; }
      .page .page-size > a.active {
        color: #57b9f8; }
    .page .page-center {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%); }
    .page .page-center ul.pagination {
      display: inline-block; }
    .page .page-center ul.pagination > li {
      display: inline-block;
      padding: 0 5px;
      min-width: 25px;
      text-align: center; }
    .page .page-center ul.pagination > li.active {
      color: #fff;
      background: #57b9f8; }
    .page .page-center ul.pagination > li.page-change {
      cursor: pointer; }
    .page .page-center ul.pagination > li.forbidden {
      color: #ccc;
      cursor: not-allowed; }
    .page .page-center .page-go {
      display: inline-block;
      margin-left: 30px; }
    .page .page-center .page-go > input {
      padding: 0 5px;
      width: 20px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 4px; }
    .page .page-center .page-go > button {
      color: #4a4a4a;
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none; }
    .page .page-center .page-go > button:hover {
      color: #57b9f8; }
    `
  ] */
})
export class PagerComponent implements OnInit, OnDestroy {

  pageNumList: any[] = [];
  pagerData: PagerData;
  /** 分页符总数  */
  totalPages: number;
  customPageSizeShow: boolean;
  customPageSizeActive: boolean;

  /** @property 分页符长度 */
  @Input() paginationLength: number = 7;
  /** @property 极简模式  */
  @Input() simpleModel: boolean = false;
  /** @property 是否能自定义pageSize大小 */
  @Input() customPageSize: boolean = true;

  @Input() data: Pager = new Pager();

  @Output() pageChange = new EventEmitter<PagerData>();
  @Output() pageError = new EventEmitter<string>();

  constructor(@Optional() @Inject(PAGER_CONFIG_TOKEN) _config: PagerConfig) {
    Object.assign(this, _config || {});
  }

  ngOnInit() {
    this.pagerData = this.data.pagerData;
    this.getPagination();
    this.data.pagerSubject.subscribe(() => {
      this.pagerData = this.data.pagerData;
      this.getPagination();
    });
  }

  /**
   * @method 获取分页器页码
   * @param {number} n 页码总数
   * @param {number} p 当前页码
   */
  getPagination(
    n: number = Math.ceil(this.pagerData.total / this.pagerData.pageSize),
    p: number = this.pagerData.pageNo
  ) {
    this.totalPages = n;

    const getNumList = (start: number, end: number) => {
      return Array.from({ length: end + 1 - start }).map((v, i) => i + start);
    },
      pbNum: number = this.paginationLength,
      pbSize: number = Math.floor(pbNum / 2 - 2);

    if (n <= pbNum) {
      this.pageNumList = getNumList(1, n);
    } else {
      if (p < pbNum - 2) {
        this.pageNumList = [...getNumList(1, pbNum - 2), '...', n];
      } else if (p >= pbNum - 2 && p <= n - (pbNum - 3)) {
        this.pageNumList = [1, '...', ...getNumList(p - pbSize, p + pbSize), '...', n];
      } else {
        this.pageNumList = [1, '...', ...getNumList(n - (pbNum - 3), n)];
      }
    }
  }

  changePageNo(v: number) {
    if (typeof v !== 'number' || this.pagerData.pageNo === v) {
      return;
    }
    this.pagerData.pageNo = v;
    this.getPagination();
    this.pageChange.emit(this.pagerData);
  }

  changePageNoTo(add: number, pNo?: number) {
    pNo = Number(pNo) || this.pagerData.pageNo + add;
    if (pNo < 1 || pNo > this.totalPages) {
      this.pageError.emit('页码超出范围了');
      return;
    }
    this.changePageNo(pNo);
  }

  changePageSize(v: number) {
    v = Math.floor(Number(v));

    this.customPageSizeShow = false;

    if (isNaN(v) || v <= 0) {
      this.pageError.emit('页码必须是正整数');
      return;
    }

    if (this.pagerData.pageSize === v) { return; }

    this.customPageSizeActive = v !== 10 && v !== 20 && v !== 50;

    this.pagerData.pageSize = v;
    this.pagerData.pageNo = 1;

    this.getPagination();
    this.pageChange.emit(this.pagerData);
  }

  ngOnDestroy() {
    this.data.pagerSubject.unsubscribe();
  }
}
