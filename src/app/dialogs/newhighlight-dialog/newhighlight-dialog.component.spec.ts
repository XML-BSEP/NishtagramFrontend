import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhighlightDialogComponent } from './newhighlight-dialog.component';

describe('NewhighlightDialogComponent', () => {
  let component: NewhighlightDialogComponent;
  let fixture: ComponentFixture<NewhighlightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewhighlightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhighlightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
