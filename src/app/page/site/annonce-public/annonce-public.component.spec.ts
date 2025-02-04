import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncePublicComponent } from './annonce-public.component';

describe('AnnoncePublicComponent', () => {
  let component: AnnoncePublicComponent;
  let fixture: ComponentFixture<AnnoncePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncePublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
