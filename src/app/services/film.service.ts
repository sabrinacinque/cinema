import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilm } from '../models/ifilm';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = `${environment.apiUrl}/film`;
  constructor(private http: HttpClient) {}

  getFilms(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.apiUrl + '/filmlist');
  }

  getFilmById(id: number): Observable<IFilm> {
    return this.http.get<IFilm>(`${this.apiUrl}/${id}`);
  }


}
