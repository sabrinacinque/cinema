import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilmListComponent } from './components/film-list/film-list.component';
import { NavbarComponent } from './components/mainComponents/navbar/navbar.component';
import { FooterComponent } from './components/mainComponents/footer/footer.component';
import { DettagliFilmComponent } from './components/dettagli-film/dettagli-film.component';
import { PrenotaComponent } from './components/prenota/prenota.component';
import { FormsModule } from '@angular/forms';
import { SalaComponent } from './components/sala/sala.component';
import { ConfermaPrenotazioneComponent } from './components/conferma-prenotazione/conferma-prenotazione.component';



@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    NavbarComponent,
    FooterComponent,
    DettagliFilmComponent,
    PrenotaComponent,
    SalaComponent,
    ConfermaPrenotazioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
