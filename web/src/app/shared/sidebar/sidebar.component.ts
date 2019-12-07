import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/dashboard/contacto/contacto.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public contactoService: ContactoService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
