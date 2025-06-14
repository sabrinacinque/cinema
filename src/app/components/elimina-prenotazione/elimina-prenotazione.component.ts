import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';
import Swal from 'sweetalert2'; // 👈 AGGIUNGI QUESTA RIGA

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
    this.prenSer.getPrenotazioneById(this.id).subscribe({
      next: () => {
        // esiste, niente da fare
      },
      error: () => {
        this.notFound = true;
      }
    });
  }

  conferma(): void {
    // 👇 SOSTITUISCI TUTTO IL METODO conferma() con questo:
    Swal.fire({
      title: 'Sei sicuro?',
      text: "Vuoi davvero annullare questa prenotazione?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sì, annulla!',
      cancelButtonText: 'No, mantieni'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prenSer.deletePrenotazione(this.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Annullata!',
              text: 'La prenotazione è stata annullata con successo.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: err => {
            Swal.fire({
              title: 'Errore!',
              text: err.status === 404
                ? 'Prenotazione non trovata o già cancellata'
                : 'Errore in fase di cancellazione',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }
}
