import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxComponent } from './checkbox.component';
import { CheckboxService } from './checkbox.service';

describe('CheckBoxComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;

  beforeEach(async(() => {
    const checkboxServiceSpy = jasmine.createSpyObj('CheckboxService', ['registerParentCheckbox', 'registerChildCheckbox']);
    TestBed.configureTestingModule({
      declarations: [CheckBoxComponent],
      providers: [
        { provide: CheckboxService, useValue: checkboxServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('创建组件', () => {
    expect(component).toBeTruthy();
  });

  it('点击切换选中的值', () => {
    component.toggle();
    expect(component.checked).toBe(true);
    component.toggle();
    expect(component.checked).toBe(false);
  });

  it('测试checkChange事件是否正确触发', () => {
    let i = 0;
    component.checkChange.subscribe(data => {
      expect(data).toBe(!(i++ & 1));
    });

    Array.from({length: 10}).forEach(() => component.toggle());
  });
});
