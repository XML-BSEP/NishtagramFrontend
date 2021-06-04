import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstoryDialogComponent } from './newstory-dialog.component';

describe('NewstoryDialogComponent', () => {
  let component: NewstoryDialogComponent;
  let fixture: ComponentFixture<NewstoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewstoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
