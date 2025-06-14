import { NgModule, isDevMode } from '@angular/core';
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
import { EliminaPrenotazioneComponent } from './components/elimina-prenotazione/elimina-prenotazione.component';
import { EliminaPrenotazioneCompletaComponent } from './components/elimina-prenotazione-completa/elimina-prenotazione-completa.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    NavbarComponent,
    FooterComponent,
    DettagliFilmComponent,
    PrenotaComponent,
    SalaComponent,
    ConfermaPrenotazioneComponent,
    EliminaPrenotazioneComponent,
    EliminaPrenotazioneCompletaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
