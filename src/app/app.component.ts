import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './inicio/menu/menu.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, FooterComponent, MatSlideToggleModule,
   HttpClientModule , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smart_front';

}
