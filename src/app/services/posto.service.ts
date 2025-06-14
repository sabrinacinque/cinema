import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iposto } from '../models/iposto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostoService {
  private baseUrl = `${environment.apiUrl}/posti`;

  constructor(private http: HttpClient) {}

  getPostiByFilmId(idFilm: number): Observable<Iposto[]> {
    return this.http.get<Iposto[]>(`${this.baseUrl}/film/${idFilm}`);
  }
}
