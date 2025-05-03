import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Iposto } from '../../models/iposto';
import { Isala } from '../../models/isala';
import { FilmService } from '../../services/film.service';
import { IFilm } from '../../models/ifilm';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { Iprenotazione } from '../../models/iprenotazione';

@Component({
  selector: 'app-conferma-prenotazione',
  templateUrl: './conferma-prenotazione.component.html',
  styleUrls: ['./conferma-prenotazione.component.css']
})
export class ConfermaPrenotazioneComponent implements OnInit {
  film!: IFilm;
  sala!: Isala;
  posti: Iposto[] = [];

  nome: string = '';
  cognome: string = '';
  email: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private filmService: FilmService,
    private prenotazioneService: PrenotazioneService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state as {
      filmId: number,
      sala: Isala,
      posti: Iposto[]
    };

    if (state) {
      this.sala = state.sala;
      this.posti = state.posti;

      this.filmService.getFilmById(state.filmId).subscribe({
        next: data => this.film = data,
        error: err => console.error('Errore caricamento film:', err)
      });
    } else {
      // Se non ci sono dati, torna indietro
      this.location.back();
    }
  }

  ngOnInit(): void {}




  get codiciPosti(): string[] {
    return this.posti.map(p => p.codice);
  }

  confermaPrenotazione(): void {
    const oggi = new Date();

    for (const posto of this.posti) {
      const prenotazione: Iprenotazione = {
        nomeUtente: this.nome,
        cognomeUtente: this.cognome,
        emailUtente: this.email,
        id_posto: posto.id,
        data: oggi
      };

      this.prenotazioneService.inserisciPrenotazione(prenotazione).subscribe({
        next: () => {
          console.log('Prenotazione salvata per il posto:', posto.codice);
        },
        error: err => {
          console.error('Errore nel salvataggio:', err);
        }
      });
    }

    alert("Prenotazione completata!");
    this.router.navigate(['/']);
  }
}
