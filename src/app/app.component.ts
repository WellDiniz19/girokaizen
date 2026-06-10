import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  // CORREÇÃO: Alterado de 'styleUrls' com array para 'styleUrl' no singular (Padrão Angular moderno)
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GiroKaizen';
}
