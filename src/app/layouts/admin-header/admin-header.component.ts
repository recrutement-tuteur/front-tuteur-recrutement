import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit {
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