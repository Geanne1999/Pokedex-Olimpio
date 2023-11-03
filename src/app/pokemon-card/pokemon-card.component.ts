import { Component, Input } from '@angular/core';
import { Pokemon, PokemonService } from '../services/pokemon.service';
import { StatsPokemon } from '../pokemon-stats-chart/pokemon-stats-chart.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass'],
})
export class PokemonCardComponent {
  @Input()
  pokemon: Pokemon;

  @Input()
  type: string | undefined;

  @Input()
  numero: number | undefined;

  pokemonTypes: string[] = [];

  pokemonAbilities: string[] = [];

  pokemonStats: { base_stat: number; name: string }[] = [];

  display: boolean = false;

  constructor(public pokemonService: PokemonService) {}

  async ngOnInit() {
    await this.loadPokemonDetails();
  }

  pokemonStatsResults: { name: string; value: number }[] = [];

  typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  selectCard() {
    this.display = true;
  }

  getPokemonImage() {
    const numeroFormatado = this.leadingZero(this.numero ?? 1);

    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroFormatado}.png`;
  }

  async loadPokemonDetails() {
    const pokemon = await this.pokemonService.getPokemonById(this.numero ?? 1);

    this.pokemonTypes = pokemon.types;
    this.pokemonAbilities = pokemon.abilities.map((item) => item.ability.name);
    this.pokemonStats = pokemon.stats.map((item) => ({
      base_stat: item.base_stat,
      name: item.stat.name,
    }));
    const statsArray = [];

    this.pokemonStats.forEach((stat) => {
      const pokemonStats = {
        name: stat.name,
        value: stat.base_stat,
      };
      statsArray.push(pokemonStats);
    });

    this.pokemonStatsResults = statsArray;
  }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }

    return s;
  }
}
