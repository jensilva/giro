import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login} from './login/login';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('giro');
}
