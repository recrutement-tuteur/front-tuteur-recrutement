import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilComponent } from './update-profil.component';

describe('UpdateProfilComponent', () => {
  let component: UpdateProfilComponent;
  let fixture: ComponentFixture<UpdateProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
