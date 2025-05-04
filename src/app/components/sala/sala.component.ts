import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../../services/sala.service';
import { PostoService } from '../../services/posto.service';
import { Isala } from '../../models/isala';
import { Iposto } from '../../models/iposto';
import { Router } from '@angular/router';
import { IFilm } from '../../models/ifilm';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  idFilm!: number;
  sala!: Isala;
  film!: IFilm;
  posti: Iposto[] = [];
  postiSelezionati: number[] = [];

  fileSinistra: Iposto[][] = [];
  fileDestra: Iposto[][] = [];

  constructor(
    private route: ActivatedRoute,
    private salaService: SalaService,
    private postoService: PostoService,
    private filmService: FilmService,
    private router: Router


  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idFilm = Number(params.get('id'));
      if (this.idFilm) {
        this.caricaSalaEPosti(this.idFilm);
      }
    });
  }

  caricaSalaEPosti(idFilm: number): void {
    this.salaService.getSalaByFilmId(idFilm).subscribe({
      next: (sala) => {
        this.sala = sala;

        this.postoService.getPostiByFilmId(idFilm).subscribe({
          next: (posti) => {
            this.posti = posti;
            this.organizzaPosti();
          },
          error: (err) => console.error('Errore nel caricamento dei posti:', err)
        });

        // ⬇️ Carica anche il film
        this.filmService.getFilmById(idFilm).subscribe({
          next: (film) => {
            this.film = film;
          },
          error: (err) => console.error('Errore nel caricamento del film:', err)
        });

      },
      error: (err) => console.error('Errore nel caricamento della sala:', err)
    });
  }


  organizzaPosti(): void {
    const gruppi: { [lettera: string]: Iposto[] } = {};

    // Raggruppa per lettera
    for (const posto of this.posti) {
      const lettera = posto.codice.charAt(0).toUpperCase();
      if (!gruppi[lettera]) gruppi[lettera] = [];
      gruppi[lettera].push(posto);
    }

    // Ordina per codice numerico dentro ogni gruppo
    const lettereOrdinate = Object.keys(gruppi).sort();
    const sinistra: Iposto[][] = [];
    const destra: Iposto[][] = [];

    lettereOrdinate.forEach((lettera, index) => {
      const ordinati = gruppi[lettera].sort(
        (a, b) => parseInt(a.codice.slice(1)) - parseInt(b.codice.slice(1))
      );

      if (index % 2 === 0) {
        sinistra.push(ordinati);
      } else {
        destra.push(ordinati);
      }
    });

    this.fileSinistra = sinistra;
    this.fileDestra = destra;
  }

  togglePosto(posto: Iposto): void {
    if (!posto.disponibile) return;

    if (this.postiSelezionati.includes(posto.id)) {
      this.postiSelezionati = this.postiSelezionati.filter(id => id !== posto.id);
    } else {
      this.postiSelezionati.push(posto.id);
    }
  }

  getStilePosto(posto: Iposto): string {
    if (!posto.disponibile) return 'bg-danger';
    if (this.postiSelezionati.includes(posto.id)) return 'bg-warning';
    return 'bg-success';
  }


  vaiAConferma(): void {
    const postiSelezionatiCompleti = this.posti.filter(p => this.postiSelezionati.includes(p.id));

    this.router.navigate(['/conferma-prenotazione'], {
      state: {
        filmId: this.idFilm,
        sala: this.sala,
        posti: postiSelezionatiCompleti
      }
    });
  }
}
