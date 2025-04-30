import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilmService } from './../../services/film.service';
import { IFilm } from '../../models/ifilm';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  filmList: IFilm[] = [];
  visibleFilms: IFilm[] = [];

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (data) => {
        this.filmList = data;
        this.visibleFilms = [...this.filmList, ...this.filmList]; // Loop visivo
      },
      error: (err) => console.error('Errore nel recupero film', err)
    });
  }

  scrollRight() {
    const carousel = this.carousel.nativeElement;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    if (carousel.scrollLeft + 220 >= maxScroll) {
      // Scroll reached end, restart from 0
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: 220, behavior: 'smooth' });
    }
  }

  scrollLeft() {
    const carousel = this.carousel.nativeElement;

    if (carousel.scrollLeft <= 0) {
      // Scroll at start, jump to end
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: -220, behavior: 'smooth' });
    }
  }

  get loopArray() {
    return Array(10).fill(0);
  }
}
