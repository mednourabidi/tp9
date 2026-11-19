import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Game } from '../models/game';
import { environment } from '../../../environments/environment.development';



const URL = environment.apiUrL+"/games";

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _http = inject(HttpClient);
  private readonly _games = signal<Game[]>([]);
  readonly games = this._games.asReadonly();

  getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(URL).pipe(
      tap(jeux => this._games.set(jeux))
    );
  }

  addGame(game: Omit<Game, 'id'>): Observable<Game> {
    return this._http.post<Game>(URL, game).pipe(
      tap(newGame => this._games.update(list => [...list, newGame]))
    );
  }
}
