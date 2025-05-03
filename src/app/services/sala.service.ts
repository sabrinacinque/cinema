import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Isala } from '../models/isala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private baseUrl = 'http://localhost:8080/sale';

  constructor(private http: HttpClient) {}

  getSalaByFilmId(idFilm: number): Observable<Isala> {
    return this.http.get<Isala>(`http://localhost:8080/sale/film/${idFilm}`);
  }
}
