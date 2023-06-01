import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tournament} from '../dataaccess/tournament';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  readonly backendUrl = 'tournament';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(tournament: Tournament): Observable<Tournament> {
    return this.http.put<Tournament>(environment.backendBaseUrl + this.backendUrl + `/${tournament.id}`, tournament);
  }

  public save(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(environment.backendBaseUrl + this.backendUrl, tournament);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
