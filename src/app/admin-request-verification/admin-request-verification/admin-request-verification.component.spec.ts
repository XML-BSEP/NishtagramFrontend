import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestVerificationComponent } from './admin-request-verification.component';

describe('AdminRequestVerificationComponent', () => {
  let component: AdminRequestVerificationComponent;
  let fixture: ComponentFixture<AdminRequestVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
