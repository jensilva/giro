import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDelete } from './team-delete';

describe('ProjectDelete', () => {
  let component: TeamDelete;
  let fixture: ComponentFixture<TeamDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
