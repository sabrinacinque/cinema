import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaPrenotazioneCompletaComponent } from './elimina-prenotazione-completa.component';

describe('EliminaPrenotazioneCompletaComponent', () => {
  let component: EliminaPrenotazioneCompletaComponent;
  let fixture: ComponentFixture<EliminaPrenotazioneCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminaPrenotazioneCompletaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminaPrenotazioneCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
