import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacSignupComponent } from './fac-signup.component';

describe('FacSignupComponent', () => {
  let component: FacSignupComponent;
  let fixture: ComponentFixture<FacSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
