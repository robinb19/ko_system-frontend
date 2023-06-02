import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FavoriteTeams} from '../dataaccess/favoriteTeam';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteTeamService {

  readonly backendUrl = 'favoriteTeam';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<FavoriteTeams[]> {
    return this.http.get<FavoriteTeams[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<FavoriteTeams> {
    return this.http.get<FavoriteTeams>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(favorite: FavoriteTeams): Observable<FavoriteTeams> {
    return this.http.put<FavoriteTeams>(environment.backendBaseUrl + this.backendUrl + `/${favorite.id}`, favorite);
  }

  public save(favorite: FavoriteTeams): Observable<FavoriteTeams> {
    return this.http.post<FavoriteTeams>(environment.backendBaseUrl + this.backendUrl, favorite);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
