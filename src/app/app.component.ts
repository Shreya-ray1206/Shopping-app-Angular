import { Component, ViewChild } from '@angular/core';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BodyComponent } from './Mycomponents/body/body.component';
import { HeaderComponent } from './Mycomponents/header/header.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BodyComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isProductDetailPage = false;

  constructor(private router: Router) {}

  @ViewChild(BodyComponent) bodyComponent!: BodyComponent;
  ngOnInit(): void {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
    
      this.isProductDetailPage = this.router.url.includes('/product'); // or use specific path match
    });
  }

  // updateProductList(searchResults: any[]) {
  //   if (this.bodyComponent) {
  //     this.bodyComponent.updateProductList(searchResults);
  //   }
  // }
}
