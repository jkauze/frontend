import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSalaComponent } from './info-sala.component';

describe('InfoSalaComponent', () => {
  let component: InfoSalaComponent;
  let fixture: ComponentFixture<InfoSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
