import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidat-header',
  standalone: true,
  imports: [],
  templateUrl: './candidat-header.component.html',
  styleUrl: './candidat-header.component.css'
})
export class CandidatHeaderComponent implements OnInit {
  menuActive = false;

  constructor() { }

  ngOnInit(): void { }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
  
  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const toggleButton = document.querySelector('.menu-toggle');
    
    if (mobileMenu && toggleButton && !mobileMenu.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
      this.menuActive = false;
    }
  }
}
