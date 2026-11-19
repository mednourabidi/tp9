import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { applyEach, form, FormField, FormRoot, min, minLength, pattern, required} from '@angular/forms/signals';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { GameService } from '../../services/game-service';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd implements OnInit {
  private readonly gameService = inject(GameService);

  readonly games = this.gameService.games;
  categories = Object.values(Category);

  
  readonly gameModel = signal<Game>({
    id: '',
    name: '',
    price: 0,
    madeIn: 'Tunisie',
    category: Category.Puzzle,
    isNew: true,
    shops: [],
  });

  
  readonly gameForm = form(this.gameModel, path => {
    required(path.name, { message: 'Nom obligatoire' });
    pattern(path.name, /^[A-Z].+$/, { message: 'Le nom doit commencer par une majuscule' });
    required(path.price, { message: 'Le prix est obligatoire' });
    min(path.price, 0.1, { message: 'Le prix doit être supérieur à 0.1 DT' });

    applyEach(path.shops, shop => {
      required(shop, { message: 'Le nom du point de vente est obligatoire' });
      minLength(shop, 2, { message: 'Taille minimale: 2 caractères' });
    });
  });

  ngOnInit() {
    this.gameService.getGames().subscribe();
  }

  onSubmit() {
    const { id, ...newGame } = this.gameModel();
    this.gameService.addGame(newGame).subscribe(() => this.resetForm());
  }

  resetForm() {
    this.gameModel.set({
      id: '',
      name: '',
      price: 0,
      madeIn: 'Tunisie',
      category: Category.Puzzle,
      isNew: true,
      shops: [],
    });
    this.gameForm().reset(); 
  }

  onAddShop() {
    this.gameModel.update(game => ({ ...game, shops: [...game.shops, ''] }));
  }

  onRemoveShop(index: number) {
    this.gameModel.update(game => ({
      ...game,
      shops: game.shops.filter((_, i) => i !== index),
    }));
  }
}
