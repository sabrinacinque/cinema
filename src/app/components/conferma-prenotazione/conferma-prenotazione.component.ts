// src/app/components/conferma-prenotazione/conferma-prenotazione.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Iposto } from '../../models/iposto';
import { Isala } from '../../models/isala';
import { FilmService } from '../../services/film.service';
import { IFilm } from '../../models/ifilm';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { IprenotazioneRequest } from '../../models/iprenotazione-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conferma-prenotazione',
  templateUrl: './conferma-prenotazione.component.html',
  styleUrls: ['./conferma-prenotazione.component.css']
})
export class ConfermaPrenotazioneComponent implements OnInit {
  film!: IFilm;
  sala!: Isala;
  posti: Iposto[] = [];

  nome = '';
  cognome = '';
  email = '';

  constructor(
    private location: Location,
    private router: Router,
    private filmService: FilmService,
    private prenotazioneService: PrenotazioneService
  ) {
    const state = this.router.getCurrentNavigation()?.extras
      .state as { filmId: number; sala: Isala; posti: Iposto[] };

    if (state) {
      this.sala = state.sala;
      this.posti = state.posti;

      this.filmService.getFilmById(state.filmId).subscribe({
        next: data => (this.film = data),
        error: err => console.error('Errore caricamento film:', err)
      });
    } else {
      this.location.back();
    }
  }

  ngOnInit(): void {}

  get codiciPosti(): string[] {
    return this.posti.map(p => p.codice);
  }

  confermaPrenotazione(): void {
    const req: IprenotazioneRequest = {
      nomeUtente: this.nome,
      cognomeUtente: this.cognome,
      emailUtente: this.email,
      idPosti: this.posti.map(p => p.id)
    };

    this.prenotazioneService
      .inserisciPrenotazioniBatch(req)
      .subscribe({
        next: (msg: string) => {
          Swal.fire({
            icon: 'success',
            title: 'Prenotazione completata!',
            text: msg,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => this.router.navigate(['/']));
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Non è stato possibile completare la prenotazione. Riprova.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Chiudi'
          });
        }
      });
  }
}
