import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationComponent } from './automation.component';

describe('AutomationComponent', () => {
  let component: AutomationComponent;
  let fixture: ComponentFixture<AutomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
