import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanUserDialog } from './ban-user.component';

describe('BanUserDialog', () => {
  let component: BanUserDialog;
  let fixture: ComponentFixture<BanUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanUserDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
