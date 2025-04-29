import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { IFilm } from '../../models/ifilm';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  filmList: IFilm[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (data) => this.filmList = data,
      error: (err) => console.error('Errore nel recupero film', err)
    });
  }
}
