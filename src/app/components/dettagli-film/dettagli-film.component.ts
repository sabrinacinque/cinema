import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { IFilm } from '../../models/ifilm';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-dettagli-film',
  templateUrl: './dettagli-film.component.html',
  styleUrls: ['./dettagli-film.component.css']
})
export class DettagliFilmComponent implements OnInit {
  film: IFilm | null = null;
  safeTrailerUrl: SafeResourceUrl | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private sanitizer: DomSanitizer //serve a dire ad Angular che quell’URL "strano" (https://www.youtube.com/embed/...) è sicuro da usare in un <iframe>.
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.filmService.getFilmById(id).subscribe({
          next: (data) => {
            this.film = data;
            this.safeTrailerUrl = this.getEmbedUrl(this.film.trailerlink);
            console.log("Film caricato:", this.film); // CONTROLLO COSA VIENE PASSATO
          },
          error: (err) => console.error('Errore nel recupero del film', err)
        });
      }
    });
  }


  //Estrae l’ID del video YouTube (es. abc123) dalla URL normale.

  //Costruisce l’URL in formato embed (https://www.youtube.com/embed/abc123)

 // Lo "sanifica" con bypassSecurityTrustResourceUrl() così Angular lo accetta in un <iframe>.


  private getEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }


  /*Cerca il parametro v=... nella URL di YouTube.
  Esempio:
  Da: https://www.youtube.com/watch?v=abc123XYZ
  Estrae: abc123XYZ*/
  private extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }
}
