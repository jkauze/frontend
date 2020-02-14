import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasUserComponent } from './salas-user.component';

describe('SalasUserComponent', () => {
  let component: SalasUserComponent;
  let fixture: ComponentFixture<SalasUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
