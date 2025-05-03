import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iposto } from '../models/iposto';

@Injectable({
  providedIn: 'root'
})
export class PostoService {
  private baseUrl = 'http://localhost:8080/posti';

  constructor(private http: HttpClient) {}

  getPostiByFilmId(idFilm: number): Observable<Iposto[]> {
    return this.http.get<Iposto[]>(`http://localhost:8080/posti/film/${idFilm}`);
  }
}
