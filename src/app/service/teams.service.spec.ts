import {TestBed} from '@angular/core/testing';
import {TeamsService} from './teams.service';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Teams} from '../dataaccess/teams';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpSpy: Spy<HttpClient>;

  const fakeTeams: Teams[] = [
    {
      id: 1,
      teamName: 'Teams 1'
    },
    {
      id: 2,
      teamName: 'Teams 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(TeamsService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of teams', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeTeams);

    service.getList().subscribe({
        next:
          teams => {
            expect(teams).toHaveSize(fakeTeams.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new teams', (done: DoneFn) => {

    const newTeams: Teams = {
      id: 3,
      teamName: 'Teams 3'
    };

    httpSpy.post.and.nextWith(newTeams);

    service.save(newTeams).subscribe({
        next: teams => {
          expect(teams).toEqual(newTeams);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an teams', (done: DoneFn) => {

    const teams = fakeTeams[0];
    teams.teamName = 'Updated Teams';

    httpSpy.put.and.nextWith(teams);

    service.update(teams).subscribe({
      next: teams => {
        expect(teams.teamName).toEqual('Updated Teams');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing teams', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
