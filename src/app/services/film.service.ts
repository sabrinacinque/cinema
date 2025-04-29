import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFilm } from '../models/ifilm';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = 'http://localhost:8080/film/filmlist';//qua è dove gli dico di connettermi per la lista delle film, ho fatto il percorso da spring 

  constructor(private http: HttpClient) {}

  getFilms(): Observable<IFilm[]> {
    return this.http.get<IFilm[]>(this.apiUrl);
  }
}
