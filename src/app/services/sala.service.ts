import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Isala } from '../models/isala';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private baseUrl = `${environment.apiUrl}/sale`;

  constructor(private http: HttpClient) {}

  getSalaByFilmId(idFilm: number): Observable<Isala> {
    return this.http.get<Isala>(`${this.baseUrl}/film/${idFilm}`);
  }
}
