import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacNavComponent } from './fac-nav.component';

describe('FacNavComponent', () => {
  let component: FacNavComponent;
  let fixture: ComponentFixture<FacNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
