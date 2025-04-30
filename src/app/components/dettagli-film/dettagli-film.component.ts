import { Component } from '@angular/core';
import { IFilm } from '../../models/ifilm';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettagli-film',
  templateUrl: './dettagli-film.component.html',
  styleUrl: './dettagli-film.component.css'
})
export class DettagliFilmComponent {
  film : IFilm | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.filmService.getFilmById(id).subscribe({
          next: (data) => this.film = data,
          error: (err) => console.error('Errore nel recupero del film', err)
        });
      } else {
        console.warn('ID film non trovato nei parametri');
      }
    });
  }
}
