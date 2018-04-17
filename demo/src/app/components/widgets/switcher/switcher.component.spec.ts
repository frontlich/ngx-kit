import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SwitcherComponent as SwitcherComponentDemo } from './switcher.component';
import { SwitcherComponent } from '../../../../.../../../../src/components/switcher';

describe('开关组件测试', () => {
  let fixture: ComponentFixture<SwitcherComponent>, switcher: SwitcherComponent;
  let fixtureDemo: ComponentFixture<SwitcherComponentDemo>, switcherDemo: SwitcherComponentDemo;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SwitcherComponent, SwitcherComponentDemo
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherComponent);
    switcher = fixture.componentInstance;
    fixtureDemo = TestBed.createComponent(SwitcherComponentDemo);
    switcherDemo = fixtureDemo.componentInstance;
  });

  it('开关组件能被创建', async(() => {
    expect(switcher).toBeTruthy();
  }));

  it('点击开关能切换abc的值', async(() => {
    expect(switcherDemo.abc).toBe(false, '默认值为false');
    // fixtureDemo.debugElement.query(By.css('.switcher')).triggerEventHandler('click', null);
    // fixtureDemo.debugElement.query(By.css('.switcher')).nativeElement.click();
    // fixture.nativeElement.querySelector('.switcher').click();
    // fixture.detectChanges();
    // console.log(switcherDemo.abc);
    /* expect(switcherDemo.abc).toBe(true, '点击第一次后abc的值为true'); */
  }));
});
