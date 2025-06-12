// prenota.component.ts
import { Component, OnInit } from '@angular/core';
import { FilmService } from './../../services/film.service';
import { IFilm } from '../../models/ifilm';

@Component({
  selector: 'app-prenota',
  templateUrl: './prenota.component.html',
  styleUrls: ['./prenota.component.css']
})
export class PrenotaComponent implements OnInit {
  filmList: IFilm[] = [];
  selectedFilmId: number | null = null;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: data => this.filmList = data,
      error: err => console.error('Errore caricamento film', err)
    });
  }

  selectFilm(id: number) {
    this.selectedFilmId = id;
  }
}
