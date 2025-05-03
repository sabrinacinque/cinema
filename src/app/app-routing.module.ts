import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './components/film-list/film-list.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';
import { PrenotaComponent } from './components/prenota/prenota.component';
import { SalaComponent } from './components/sala/sala.component';
import { ConfermaPrenotazioneComponent } from './components/conferma-prenotazione/conferma-prenotazione.component';

const routes: Routes = [
  { path: '', component: FilmListComponent },
  { path: 'film/:id', component: DettagliFilmComponent },
  { path: 'prenota', component: PrenotaComponent },
  { path: 'sala/:id', component: SalaComponent },
  { path: 'conferma-prenotazione', component: ConfermaPrenotazioneComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
