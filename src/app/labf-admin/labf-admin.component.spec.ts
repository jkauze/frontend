import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabfAdminComponent } from './labf-admin.component';

describe('LabfAdminComponent', () => {
  let component: LabfAdminComponent;
  let fixture: ComponentFixture<LabfAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabfAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabfAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
