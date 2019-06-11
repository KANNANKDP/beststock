import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacComponent } from './admin-fac.component';

describe('AdminFacComponent', () => {
  let component: AdminFacComponent;
  let fixture: ComponentFixture<AdminFacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
