import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRequestsComponent } from './campaign-requests.component';

describe('CampaignRequestsComponent', () => {
  let component: CampaignRequestsComponent;
  let fixture: ComponentFixture<CampaignRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
