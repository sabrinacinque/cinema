import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaPrenotazioneComponent } from './conferma-prenotazione.component';

describe('ConfermaPrenotazioneComponent', () => {
  let component: ConfermaPrenotazioneComponent;
  let fixture: ComponentFixture<ConfermaPrenotazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfermaPrenotazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfermaPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
