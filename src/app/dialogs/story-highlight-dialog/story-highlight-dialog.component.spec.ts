import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHighlightDialogComponent } from './story-highlight-dialog.component';

describe('StoryHighlightDialogComponent', () => {
  let component: StoryHighlightDialogComponent;
  let fixture: ComponentFixture<StoryHighlightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryHighlightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHighlightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
