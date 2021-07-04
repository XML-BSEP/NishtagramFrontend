import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignInfluencerRequestComponent } from './campaign-influencer-request.component';

describe('CampaignInfluencerRequestComponent', () => {
  let component: CampaignInfluencerRequestComponent;
  let fixture: ComponentFixture<CampaignInfluencerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignInfluencerRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignInfluencerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
