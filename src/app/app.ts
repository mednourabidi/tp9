import { Component, signal } from '@angular/core';
import { GameAdd } from './application/components/game-add/game-add';
import { EmployeAdd } from './exercice/components/employe-add/employe-add';

@Component({
  imports: [GameAdd,EmployeAdd],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TP9');
}
