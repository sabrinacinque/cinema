import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';

@Component({
  selector: 'app-elimina-prenotazione',
  templateUrl: './elimina-prenotazione.component.html'
})
export class EliminaPrenotazioneComponent implements OnInit {
  id!: number;
  notFound = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prenSer: PrenotazioneService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    // prova a recuperare la prenotazione
    this.prenSer.getPrenotazioneById(this.id).subscribe({
      next: () => {
        // esiste, niente da fare
      },
      error: () => {
        // 404 → non esiste
        this.notFound = true;
      }
    });
  }

  conferma(): void {
    this.prenSer.deletePrenotazione(this.id).subscribe({
      next: () => {
        alert('Prenotazione annullata con successo');
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.status === 404
          ? 'Prenotazione non trovata o già cancellata'
          : 'Errore in fase di cancellazione';
      }
    });
  }
}
