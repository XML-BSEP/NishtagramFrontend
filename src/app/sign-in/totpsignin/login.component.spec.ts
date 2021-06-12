import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotpLoginComponent } from './login.component';

describe('TotpLoginComponent', () => {
  let component: TotpLoginComponent;
  let fixture: ComponentFixture<TotpLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotpLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
