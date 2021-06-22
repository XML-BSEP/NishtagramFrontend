import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowRequestDialogComponent } from './follow-request-dialog.component';

describe('FollowRequestDialogComponent', () => {
  let component: FollowRequestDialogComponent;
  let fixture: ComponentFixture<FollowRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
