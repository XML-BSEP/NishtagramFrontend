import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add2collectionDialogComponent } from './add2collection-dialog.component';

describe('Add2collectionDialogComponent', () => {
  let component: Add2collectionDialogComponent;
  let fixture: ComponentFixture<Add2collectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add2collectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Add2collectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
