import { Component, OnInit, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  async getUsers() {
    return await this.usersService.getUsers()
  }

  readonly users = signal<any[]>([])

  async ngOnInit() {
    const data = await this.getUsers()

    this.users.set(data)
  }

}

