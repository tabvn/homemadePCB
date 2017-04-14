import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDevicesComponent } from './select-devices.component';

describe('SelectDevicesComponent', () => {
  let component: SelectDevicesComponent;
  let fixture: ComponentFixture<SelectDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
