import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatFooterComponent } from './candidat-footer.component';

describe('CandidatFooterComponent', () => {
  let component: CandidatFooterComponent;
  let fixture: ComponentFixture<CandidatFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
