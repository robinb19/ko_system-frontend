import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teams} from '../dataaccess/teams';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  readonly backendUrl = 'team';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Teams[]> {
    return this.http.get<Teams[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Teams> {
    return this.http.get<Teams>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(teams: Teams): Observable<Teams> {
    return this.http.put<Teams>(environment.backendBaseUrl + this.backendUrl + `/${teams.id}`, teams);
  }

  public save(teams: Teams): Observable<Teams> {
    return this.http.post<Teams>(environment.backendBaseUrl + this.backendUrl, teams);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
