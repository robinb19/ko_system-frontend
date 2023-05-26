import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamDetailComponent } from './favorite-team-detail.component';

describe('FavoriteTeamDetailComponent', () => {
  let component: FavoriteTeamDetailComponent;
  let fixture: ComponentFixture<FavoriteTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTeamDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
