import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, RouterModule],
  template: `
    <app-header />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'phonebook-app';
}
