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
})
export class PagerComponent implements OnInit, OnDestroy {

  pageNumList: any[] = [];
  pagerData: PagerData;
  /** 分页符总数  */
  totalPages: number;

  /** @property 分页符长度 */
  @Input() paginationLength: number = 7;
  /** @property 极简模式  */
  @Input() simpleModel: boolean = false;

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
    if (this.pagerData.pageSize === v) { return; }
    this.pagerData.pageSize = v;
    this.pagerData.pageNo = 1;
    this.getPagination();
    this.pageChange.emit(this.pagerData);
  }

  ngOnDestroy() {
    this.data.pagerSubject.unsubscribe();
  }
}
