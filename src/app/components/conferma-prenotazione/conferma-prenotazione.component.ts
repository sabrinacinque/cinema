import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Iposto } from '../../models/iposto';
import { Isala } from '../../models/isala';
import { FilmService } from '../../services/film.service';
import { IFilm } from '../../models/ifilm';

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
    private filmService: FilmService
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

  confermaPrenotazione(): void {
    console.log('Prenotazione confermata:', {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
      film: this.film,
      sala: this.sala,
      posti: this.posti.map(p => p.codice)
    });

    alert("Prenotazione confermata!");
  }


  get codiciPosti(): string[] {
    return this.posti.map(p => p.codice);
  }
}
