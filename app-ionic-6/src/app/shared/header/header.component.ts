import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() verTitulo = false;
  @Input() verVolver = true;

  constructor(
    public platform: Platform,
    private router: Router,
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      this.router.navigateByUrl('home', { replaceUrl: true });
    });
  }

}
