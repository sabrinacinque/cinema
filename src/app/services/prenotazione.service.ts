import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iprenotazione } from '../models/iprenotazione';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private baseUrl = 'http://localhost:8080/prenotazioni';

  constructor(private http: HttpClient) {}

  inserisciPrenotazione(prenotazione: Iprenotazione): Observable<any> {
    return this.http.post(`${this.baseUrl}/inserisci`, prenotazione);
  }
}
