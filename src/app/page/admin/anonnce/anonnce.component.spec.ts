import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonnceComponent } from './anonnce.component';

describe('AnonnceComponent', () => {
  let component: AnonnceComponent;
  let fixture: ComponentFixture<AnonnceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonnceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
