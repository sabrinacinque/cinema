import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaPrenotazioneComponent } from './elimina-prenotazione.component';

describe('EliminaPrenotazioneComponent', () => {
  let component: EliminaPrenotazioneComponent;
  let fixture: ComponentFixture<EliminaPrenotazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminaPrenotazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminaPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
