import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidatHeaderComponent } from '../candidat-header/candidat-header.component';
import { CandidatFooterComponent } from '../candidat-footer/candidat-footer.component';


@Component({
  selector: 'app-candidat-layout',
  standalone: true,
  imports: [RouterOutlet,CandidatHeaderComponent, CandidatFooterComponent],
  templateUrl: './candidat-layout.component.html',
  styleUrl: './candidat-layout.component.css'
})
export class CandidatLayoutComponent {

}
