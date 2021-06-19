import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostDialogComponent } from './report-post-dialog.component';

describe('ReportPostDialogComponent', () => {
  let component: ReportPostDialogComponent;
  let fixture: ComponentFixture<ReportPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
