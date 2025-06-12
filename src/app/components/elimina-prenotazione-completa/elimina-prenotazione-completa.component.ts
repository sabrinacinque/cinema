// src/app/components/elimina-prenotazione-completa/elimina-prenotazione-completa.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-prenotazione-completa',
  templateUrl: './elimina-prenotazione-completa.component.html',
  styleUrls: ['./elimina-prenotazione-completa.component.css']
})
export class EliminaPrenotazioneCompletaComponent implements OnInit {
  code!: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prenSer: PrenotazioneService
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
  }

  conferma(): void {
    this.prenSer.deletePrenotazioneCompleta(this.code).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Prenotazione annullata',
          text: 'Tutta la prenotazione è stata annullata con successo.',
          confirmButtonText: 'OK'
        }).then(() => this.router.navigate(['/']));
      },
      error: err => {
        this.error = err.status === 404
          ? 'Prenotazione non trovata o già cancellata'
          : 'Errore in fase di cancellazione';
      }
    });
  }
}
