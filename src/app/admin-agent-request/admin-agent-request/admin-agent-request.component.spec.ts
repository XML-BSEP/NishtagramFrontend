import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentRequestComponent } from './admin-agent-request.component';

describe('AdminAgentRequestComponent', () => {
  let component: AdminAgentRequestComponent;
  let fixture: ComponentFixture<AdminAgentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAgentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
