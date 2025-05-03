import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../../services/sala.service';
import { PostoService } from '../../services/posto.service';
import { Isala } from '../../models/isala';
import { Iposto } from '../../models/iposto';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  idFilm!: number;
  sala!: Isala;
  posti: Iposto[] = [];
  postiSelezionati: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private salaService: SalaService,
    private postoService: PostoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idFilm = Number(params.get('id'));
      console.log('ID film:', this.idFilm); // Debug
      if (this.idFilm) {
        this.caricaSalaEPosti(this.idFilm);
      }
    });
  }

  caricaSalaEPosti(idFilm: number): void {
    this.salaService.getSalaByFilmId(idFilm).subscribe({
      next: (sala) => {
        this.sala = sala;
        console.log('Sala caricata:', sala);

        this.postoService.getPostiByFilmId(idFilm).subscribe({
          next: (posti) => {
            this.posti = posti;
            console.log('Posti caricati:', posti);
          },
          error: (err) => console.error('Errore nel caricamento dei posti:', err)
        });
      },
      error: (err) => console.error('Errore nel caricamento della sala:', err)
    });
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
}
