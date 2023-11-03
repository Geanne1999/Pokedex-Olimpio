import { Component } from '@angular/core';
import { Pokemon, PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.sass'],
})
export class PokemonSearchComponent {
  constructor(public pokemonService: PokemonService) {}

  filterPokemon(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.pokemonService.filterPokemon(searchTerm);
  }
}
