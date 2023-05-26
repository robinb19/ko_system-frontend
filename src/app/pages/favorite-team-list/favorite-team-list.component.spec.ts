import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamListComponent } from './favorite-team-list.component';

describe('FavoriteTeamListComponent', () => {
  let component: FavoriteTeamListComponent;
  let fixture: ComponentFixture<FavoriteTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTeamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
