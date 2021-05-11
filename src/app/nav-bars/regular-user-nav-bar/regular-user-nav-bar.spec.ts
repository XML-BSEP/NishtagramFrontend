import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularUserComponent } from './regular-user-nav-bar.component';

describe('CustomerNavBarComponent', () => {
  let component: RegularUserComponent;
  let fixture: ComponentFixture<RegularUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
