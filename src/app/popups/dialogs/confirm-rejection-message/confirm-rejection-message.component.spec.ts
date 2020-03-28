import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRejectionMessageComponent } from './confirm-rejection-message.component';

describe('ConfirmRejectionMessageComponent', () => {
  let component: ConfirmRejectionMessageComponent;
  let fixture: ComponentFixture<ConfirmRejectionMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRejectionMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRejectionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
