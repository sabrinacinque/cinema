import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './components/film-list/film-list.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';

const routes: Routes = [
  { path: '', component: FilmListComponent },
  { path: 'film/:id', component: DettagliFilmComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
