import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { CheckBoxComponent } from './checkbox.component';

class ChildCheckbox {
  stateChange = new Subject();
  children: CheckBoxComponent[] = [];
  stopUp: boolean; // 在父级改变子级时，阻止子级继续向上传播

  get total() {
    return this.children.length;
  }

  /** 获取选中的数量 */
  get checkedNum() {
    const n = this.children.filter(item => item.checked || item.indeterminate).map(item => {
      if (item.checked) {
        return 1 as number;
      } else {
        return 0.5 as number;
      }
    }).reduce((p, c) => p + c, 0);
    return n;
  }

  addChild(checkbox: CheckBoxComponent) {
    if (this.children.indexOf(checkbox) !== -1) { return; }
    checkbox.checkChange.subscribe((flag: boolean) => {
      checkbox.checked = flag;
      this.stopUp = false;
      this.stateChange.next();
    });
    checkbox.indeterminateChange.subscribe((flag: boolean) => {
      checkbox.indeterminate = flag;
      this.stopUp = false;
      this.stateChange.next();
    });

    this.children.push(checkbox);
  }

  destoryItem(checkbox: CheckBoxComponent) {
    const i = this.children.indexOf(checkbox);
    if (i === -1) { return; }
    this.children.splice(i, 1);
  }

  destoryAll() {
    this.stateChange.complete();
  }
}

@Injectable()
export class CheckboxService {

  private childMap = new Map<string, ChildCheckbox>();
  private parentHasSetMap = new Map<string, AsyncSubject<boolean>>();

  /** 检查父级是否已存在 */
  private checkExisting(id: string) {
    let asyncSub = this.parentHasSetMap.get(id);
    if (!asyncSub) {
      asyncSub = new AsyncSubject<boolean>();
      this.parentHasSetMap.set(id, asyncSub);
    }
    return asyncSub;
  }

  /** 根据子级选中状态变化，设置父级状态 */
  private setParentState(child: ChildCheckbox, parent: CheckBoxComponent) {
    const total = child.total,
      checkedNum = child.checkedNum,
      setState = (checked: boolean, indeterminate: boolean) => {
        parent.checked = checked;
        parent.indeterminate = indeterminate;
        parent.indeterminateChange.emit(indeterminate);
      };

    if (checkedNum === 0) { return setState(false, false); }

    if (checkedNum === total) { return setState(true, false); }

    if (!parent.indeterminate) { setState(false, true); }
  }

  /** 注册父级checkbox */
  registerParentCheckbox(id: string, parentCheckbox: CheckBoxComponent) {

    // 父级只能有一个
    if (this.parentHasSetMap.has(id)) { throw new Error('parentId has existed'); }

    const parentSub = this.checkExisting(id);
    parentSub.next(true); // 通知子级，父级已注册完成
    parentSub.complete();

    const child = new ChildCheckbox();
    this.childMap.set(id, child); // 注册父级对应的子集对象

    parentCheckbox.checkChange.subscribe((flag: boolean) => { // 订阅父级状态改变事件
      child.stopUp = true; // 先阻止向上传播
      child.children.forEach(item => {
        item.checked = flag;
        item.checkChange.emit(flag);
      });
    });

    child.stateChange.subscribe(() => { // 订阅子级状态改变事件
      if (child.stopUp) { return; }
      this.setParentState(child, parentCheckbox);
    });
  }

  /** 注册子级复选框 */
  registerChildCheckbox(id: string, childCheckbox: CheckBoxComponent) {
    this.checkExisting(id).subscribe(() => {
      console.log(id);
      this.childMap.get(id).addChild(childCheckbox);
    });
  }

  /** 注销父级 */
  unregisterParent(id: string, parentCheckbox: CheckBoxComponent) {
    this.childMap.get(id).destoryAll();
    parentCheckbox.checkChange.complete();
    this.parentHasSetMap.delete(id);
    this.childMap.delete(id);
  }

  /** 注销某个子级复选框 */
  unregisterChild(id: string, childCheckbox: CheckBoxComponent) {
    const child = this.childMap.get(id);
    if (child) {
      child.destoryItem(childCheckbox);
    }
  }
}
