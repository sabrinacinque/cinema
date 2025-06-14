import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iprenotazione } from '../models/iprenotazione';
import { Observable } from 'rxjs';
import { IprenotazioneRequest } from '../models/iprenotazione-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private baseUrl = `${environment.apiUrl}/prenotazioni`;

  constructor(private http: HttpClient) {}

  // Metodo nuovo (batch, invia idPosti[])
  inserisciPrenotazioniBatch(req: IprenotazioneRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/inserisci`, req,{ responseType: 'text' }  );
  }

  getPrenotazioni(): Observable<Iprenotazione[]> {
    return this.http.get<Iprenotazione[]>(`${this.baseUrl}/tutte`);
  }

  getPrenotazioneById(id: number): Observable<Iprenotazione> {
    return this.http.get<Iprenotazione>(`${this.baseUrl}/${id}`);
  }

  // cancella una prenotazione col suo ID
  deletePrenotazione(id: number): Observable<Iprenotazione> {
    return this.http.delete<Iprenotazione>(
      `${this.baseUrl}/eliminaprenotazione/${id}`
    );
  }

  // CANCELLAZIONE INTERA PRENOTAZIONE (reservationCode è una stringa UUID)
  deletePrenotazioneCompleta(reservationCode: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/elimina-prenotazione-completa/${reservationCode}`
    );
  }
}
